import React, { useReducer, useEffect, useCallback, useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Layout, Row, Col, Card, Typography } from 'antd'
import GameBox from '../gamebox/gamebox'
import './gamegrid.scss'
import { InitalizeGame } from './functions'
import GameModal from '../gamemodal/GameModal'
import { CheckWinner } from '../../shared/tictac/functions'
import { GAME_INITIALS, gameReducer } from './reducer'
import { addGamePlay } from '../../redux/gamePlay/add/api'
import { waitFor, asyncForEach } from '../../shared/functions'

const { Text } = Typography

let animateDelay = 800
let firstload = true
const boxRefs: any = []

const GameGrid = () => {
  const [state, dispatch] = useReducer(gameReducer, GAME_INITIALS)

  const sdispatch = useDispatch()

  const animateGame = useCallback(() => {
    return new Promise(async res => {
      await asyncForEach(state.boxes, async (box: Box, index: number) => {
        boxRefs[box.id].buttonNode.innerHTML = `<span>${box.value}</span>`
        boxRefs[box.id].buttonNode.disabled = true
        if (index < state.boxes.length - 1) {
          await waitFor(animateDelay)
        }
      })
      res()
    })
  }, [state.boxes])
  const saveGame = useCallback(
    (draw: boolean, player: string) => {
      sdispatch(
        addGamePlay({
          winner: player,
          player1: state.player1,
          player2: state.player2,
          draw,
          boxes: state.boxes,
        })
      )
    },
    [sdispatch, state.boxes, state.player1, state.player2]
  )
  useEffect(() => {
    if (state.replay || state.drawModalVisible) {
      return
    }
    if (state.step >= 5 && state.step < 9) {
      const result: Winner = CheckWinner(state.boxes)
      if (result.draw == false && state.winnerPlayer === 0) {
        dispatch({ type: 'winner', payload: result.player })
        saveGame(false, result.player.toString())
      }
    } else if (state.step === 9) {
      const result: Winner = CheckWinner(state.boxes)
      if (result.draw == false && state.winnerPlayer === 0) {
        dispatch({ type: 'winner', payload: result.player })
        saveGame(false, result.player.toString())
      } else {
        dispatch({ type: 'draw' })
        saveGame(true, '0')
      }
    }
    return () => {}
  }, [state.boxes, state.replay, state.drawModalVisible, state.winnerPlayer, state.step, saveGame])

  useEffect(() => {
    if (state.replay) {
      restUI()
      animateDelay = 1000
      animateGame().then(() => {
        waitFor(500).then(() => {
          dispatch({ type: 'replay_end' })
        })
      })
    }
    return
  }, [state.replay,animateGame])
  /* useLayoutEffect(() => {
    if (!firstload) {
      dispatch({ type: 'reset', payload: InitalizeGame() })
      restUI()
      return
    }
    firstload = false
  }, [])*/
  const restUI = () => {
    // tslint:disable-next-line: no-increment-decrement
    for (let i: number = 0; i < 9; i++) {
      boxRefs[`box${i}`].buttonNode.innerHTML = `<span>-</span>`
      boxRefs[`box${i}`].buttonNode.disabled = false
    }
  }

  const btnCallBack = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id: string = event.currentTarget.id
      boxRefs[id].buttonNode.innerHTML = `<span>${state.letter}</span>`
      boxRefs[id].buttonNode.disabled = true
      dispatch({
        type: 'click',
        payload: {
          id,
          player: state.player,
          value: state.letter,
          step: state.step,
        },
      })
    },
    [state]
  )
  const items: any = []

  // tslint:disable-next-line: no-increment-decrement
  for (let i = 0; i < 9; i++) {
    items.push(
      <GameBox
        key={`box${i}`}
        id={`box${i}`}
        ref={(input: any) => {
          boxRefs[`box${i}`] = input
        }}
        callback={btnCallBack}
      />
    )
  }

  return (
    <Layout className="gamegrid">
      <Layout style={{ background: '#ECECEC', padding: '30px' }} />
      <Row>
        <Col span={8}>
          <Card title="Player 1" bordered={false}>
            {state.player1}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Current Turn" bordered={false}>
            <Text className="playerturn">Player {state.player}</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Player 2" bordered={false}>
            {state.player2}
          </Card>
        </Col>
      </Row>
      <Row>{items}</Row>
      <GameModal
        key={'success'}
        mstatus={'success'}
        title={'Congraulations!'}
        subtitle={`Player ${state.winnerPlayer} Wins`}
        playagain={e => {
          dispatch({ type: 'reset', payload: InitalizeGame() })
          restUI()
        }}
        replay={e => {
          dispatch({ type: 'replay' })
        }}
        visible={state.successModalVisible}
      />
      <GameModal
        key={'error'}
        mstatus={'error'}
        title={'Match Draw'}
        subtitle={`Both players failed`}
        playagain={e => {
          dispatch({ type: 'reset', payload: InitalizeGame() })
          restUI()
        }}
        replay={e => {
          dispatch({ type: 'replay' })
        }}
        visible={state.drawModalVisible}
      />
      <GameModal
        key={'warning'}
        mstatus={'warning'}
        title={'Reply End'}
        subtitle={``}
        playagain={e => {
          dispatch({ type: 'reset', payload: InitalizeGame() })
          restUI()
        }}
        replay={e => {
          console.log("Did i fire")
          dispatch({ type: 'replay' })
        }}
        visible={state.replyModalVisible}
      />
    </Layout>
  )
}
export default GameGrid
