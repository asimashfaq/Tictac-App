import React, { useReducer, useEffect, useCallback, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Row, Col, Card, Typography } from 'antd'
import GameBox from './gamebox'
import './gamegrid.scss'
import { GAME_INITIALS } from './props'
import { sleep, gameReducer, CheckWinner, InitalizeGame } from './functions/Functions'
import GameModal from '../gamemodal/GameModal'
import { addGamePlay } from '../../redux/reducers/gamePlays/api'

const { Text } = Typography
let animateDelay = 1000
let firstload = true
interface Props {}
const GameGrid = () => {
  const [state, dispatch] = useReducer(gameReducer, GAME_INITIALS)
  // store dispatcher and state
  const sState = useSelector((state: any) => state.gameplayadd)
  const sdispatch = useDispatch()

  const animateGame = useCallback(() => {
    return new Promise(res => {
      state.boxes.forEach(async (box: Box, index: number) => {
        animateDelay = animateDelay + 1000
        await updateBoxUI(box.id, box.value, animateDelay)
        if (index === state.boxes.length - 1) {
          res()
        }
      })
    })
  }, [state.boxes])
  const updateBoxUI = async (boxId: string, boxValue: string, animateDelay: number) => {
    return await sleep(animateDelay).then(() => {
      const element: HTMLElement | null = document.getElementById(boxId)!
      element.innerHTML = `<span>${boxValue}</span>`
      const buttonIndex: number = parseInt(boxId.slice(-1), 10)
      dispatch({ type: 'disable', payload: buttonIndex })
    })
  }

  useEffect(() => {
    if (state.replay || state.drawModalVisible) {
      return
    }
    if (state.step >= 5 && state.step < 9) {
      const result: Winner = CheckWinner(state.boxes)
      if (!result.draw && state.winnerPlayer === 0) {
        dispatch({ type: 'winner', payload: result.player })
        saveGamePlay(false, result.player.toString())
      }
    } else if (state.step === 9) {
      const result: Winner = CheckWinner(state.boxes)
      if (!result.draw && state.winnerPlayer === 0) {
        dispatch({ type: 'winner', payload: result.player })
        saveGamePlay(false, result.player.toString())
      } else {
        dispatch({ type: 'draw' })
        saveGamePlay(true, '0')
      }
    }
    return () => {}
  }, [state.boxes, state.replay, state.drawModalVisible, state.winnerPlayer, state.step])

  useEffect(() => {
    if (state.replay) {
      restUI()
      animateDelay = 1000
      animateGame().then(() => {
        sleep(1000).then(() => {
          dispatch({ type: 'replay_end' })
        })
      })
      // start animation
    }
    return
  }, [state.replay, animateGame])
  useLayoutEffect(() => {
    if (!firstload) {
      dispatch({ type: 'reset', payload: InitalizeGame() })
      restUI()
      return
    }
    firstload = false
  }, [])
  const restUI = () => {
    // tslint:disable-next-line: no-increment-decrement
    for (let i: number = 0; i < 9; i++) {
      const element: HTMLElement | null = document.getElementById(`box${i}`)!
      element.innerHTML = `<span>-</span>`
    }
  }
  const saveGamePlay = (draw: boolean, player: string) => {
    sdispatch(
      addGamePlay({
        winner: player,
        player1: state.player1,
        player2: state.player2,
        draw,
        boxes: state.boxes,
      })
    )
  }
  const btnCallBack = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id: string = event.currentTarget.id
      event.currentTarget.innerHTML = `<span>${state.letter}</span>`
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
  const items = []
  // tslint:disable-next-line: no-increment-decrement
  for (let i = 0; i < 9; i++) {
    items.push(
      <GameBox
        key={`box${i}`}
        id={`box${i}`}
        buttondisable={state.buttonDisable[i]}
        callback={btnCallBack}
      />
    )
  }
  return (
    <Layout className="gamegrid">
      <Row>{items}</Row>
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
      <GameModal
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
        mstatus={'warning'}
        title={'Reply End'}
        subtitle={``}
        playagain={e => {
          dispatch({ type: 'reset', payload: InitalizeGame() })
          restUI()
        }}
        replay={e => {
          dispatch({ type: 'replay' })
        }}
        visible={state.replyModalVisible}
      />
    </Layout>
  )
}
export default GameGrid
