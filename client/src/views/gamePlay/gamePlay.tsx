/**
 * @GamPlay show the replay of the pervious games
 * @example ``` <GamePlay
          match={{ params: { id: 1 }, isExact: true, path: '/replay/:id', url: '/replay/1' }}
          errorMsg={true} 
          loadingMsg={false}
        />
 ```
 **/

import React, { useEffect, useCallback } from 'react'
import { Layout, Row, Col, Card, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getGamePlay } from '../../redux/gamePlay/get/api'
import GameBox from '../../components/gamebox'
import './gamePlay.scss'
import { getGamePlayReset } from '../../redux/gamePlay/get/actions'
import { asyncForEach, waitFor } from '../../shared/functions'

/**
 * @erroMsg default false (used for testing)
 * @loadingMsg default false (used for testing)
 * @match react-router params
 **/
interface Props {
  errorMsg: boolean
  loadingMsg: boolean
  match: any
}

const { Text } = Typography
// animation delay for 800ms
const animateDelay = 800
// to save GameBoxRefs
const boxRefs: any = []
// to Generate GameBox grid
const items: any = []
const GamePlay: React.FC<Props> = ({ match, errorMsg = false, loadingMsg = false }: Props) => {
  // load state from the thunk store
  const sState = useSelector((state: any) => state.gameplay.get)
  const { data } = sState
  // thunk dispatcher
  const sdispatch = useDispatch()

  useEffect(() => {
    // load the gamePlay from db or API Call
    sdispatch(getGamePlay(match.params.id, errorMsg, loadingMsg))
    // call when component unmount
    return function cleanup() {
      // clear the state
      sdispatch(getGamePlayReset())
    }
  }, [sdispatch, match])

  const animateGame = useCallback(() => {
    return new Promise(async res => {
      await asyncForEach(data.boxes, async (box: Box, index: number) => {
        boxRefs[box.id].buttonNode.innerHTML = `<span>${box.value}</span>`
        boxRefs[box.id].buttonNode.disabled = true
        if (index < data.boxes.length - 1) {
          await waitFor(animateDelay)
        }
      })
      res()
    })
  }, [data.boxes])

  useEffect(() => {
    if (!sState.fetching) {
      if (data.boxes.length > 0) {
        animateGame().then(() => {
          // wait for 500ms to show the Replay End alert
          waitFor(500).then(() => {
            alert('Replay End')
          })
        })
      }
    }
  }, [data.boxes, animateGame])

  if (items.length === 0) {
    // tslint:disable-next-line: no-increment-decrement
    for (let i = 0; i < 9; i++) {
      // generating the gamegrid
      items.push(
        <GameBox
          ref={(input: any) => {
            boxRefs[`box${i}`] = input
          }}
          key={`box${i}`}
          id={`box${i}`}
          callback={() => {}}
        />
      )
    }
  }

  return (
    <div>
      {sState.fetching === false ? (
        sState.error === null ? (
          <Layout className="gamegrid">
            <Layout style={{ background: '#ECECEC', padding: '30px' }} />
            <Row>
              <Col span={8}>
                <Card title="Player 1" bordered={false}>
                  {data.player1}
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Winner" bordered={false}>
                  <Text className="playerturn">Player {data.winner}</Text>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Player 2" bordered={false}>
                  {data.player2}
                </Card>
              </Col>
            </Row>
            <Row>{items}</Row>
          </Layout>
        ) : (
          <div className="errorMsg">Unable to Load Data</div>
        )
      ) : (
        <div className="loadingMsg">Loading</div>
      )}
    </div>
  )
}

export default GamePlay
