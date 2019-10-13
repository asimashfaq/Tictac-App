import React, { useEffect, useCallback } from 'react'
import { Layout, Row, Col, Card, Typography } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { getGamePlay } from '../../redux/gamePlay/get/api'
import GameBox from '../../components/gamebox/gamebox'
import './gamePlay.scss'
import { getGamePlayReset } from '../../redux/gamePlay/get/actions'
import { asyncForEach, waitFor } from '../../shared/functions'

const { Text } = Typography
interface Props {
  errorMsg: boolean
  loadingMsg: boolean
  match: any
}
const animateDelay = 800
const boxRefs: any = []
const items: any = []
const GamePlay: React.FC<Props> = ({ match, errorMsg = false, loadingMsg = false }: Props) => {
  const sState = useSelector((state: any) => state.gameplay.get)
  const { data } = sState
  const sdispatch = useDispatch()

  useEffect(() => {
    sdispatch(getGamePlay(match.params.id, errorMsg, loadingMsg))
    return function cleanup() {
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
