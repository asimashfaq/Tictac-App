/**
 * @GameGrid
 * Render all the UI to play game.
 * Save the result of game to the db.
 **/

import React, { useReducer, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Layout, Row, Col, Card, Typography } from 'antd'
import GameBox from '../gamebox'
import './gamegrid.scss'
import { InitalizeGame } from './functions'
import GameModal from '../gamemodal/index'
import { CheckWinner } from '../../shared/tictac/functions'
import { GAME_INITIALS, gameReducer } from './reducer'
import { addGamePlay } from '../../redux/gamePlay/add/api'
import { waitFor, asyncForEach } from '../../shared/functions'

const { Text } = Typography

let animateDelay = 800
const boxRefs: any = []

const GameGrid = () => {
  /**
   * Stores all the internal states of the @Component
   * and returns a copy of state in @state
   * and a dispatcher function that changes @state with @dispatch
   * dispatching type of @action
   */
  const [state, dispatch] = useReducer(gameReducer, GAME_INITIALS)

  /**
   * Stores @dispatcher of redux, used to change @state in reducers
   */
  const sdispatch = useDispatch()

  /**
   * Animates the complete GamePlay, when Replay Button is clicked
   */
  const animateGame = useCallback(() => {
    return new Promise(async res => {
      // loop through all the boxes syncoronusly.
      await asyncForEach(state.boxes, async (box: Box, index: number) => {
        // change the inner html to box.value send it must be 'x' or 'o'.
        boxRefs[box.id].buttonNode.innerHTML = `<span>${box.value}</span>`
        // disable the button so that user cannot click it.
        boxRefs[box.id].buttonNode.disabled = true
        // check for the end of animation.
        if (index < state.boxes.length - 1) {
          // add the delay to show the animation.
          await waitFor(animateDelay)
        }
      })
      // resolve the promise.
      res()
    })
  }, [state.boxes])

  /**
   * Saves the current GamePlay
   * @param draw boolean
   * @param player string
   */
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

  /**
   * Evaluate's game, finds result through @CheckWinner func
   * dispatches result DRAW || WINNER
   */
  useEffect(() => {
    // return the execution if ther replay or draw Modal is visible.
    if (state.replay || state.drawModalVisible) {
      return
    }
    //  check for the game win when the steps are in between 5-8.
    if (state.step >= 5 && state.step < 9) {
      // check for the winner and return the result.
      const result: Winner = CheckWinner(state.boxes)
      if (!result.draw && state.winnerPlayer === 0) {
        dispatch({ type: 'winner', payload: result.player })
        saveGame(false, result.player.toString())
      }
    } else if (state.step === 9) {
      // check for the winner at the end of game. Game should be draw or must have a winner.
      const result: Winner = CheckWinner(state.boxes)
      if (!result.draw && state.winnerPlayer === 0) {
        dispatch({ type: 'winner', payload: result.player })
        saveGame(false, result.player.toString())
      } else {
        dispatch({ type: 'draw' })
        saveGame(true, '0')
      }
    }
    return () => {}
  }, [state.boxes, state.replay, state.drawModalVisible, state.winnerPlayer, state.step, saveGame])

  /**
   * Works once @replay state changes, if it changes to TRUE,
   * it animates gameplay with @animateGame
   */
  useEffect(() => {
    if (state.replay) {
      // reset the UI of the game play all boxes get enabled and have value '-'
      restUI()
      // reset the animation Delay value
      animateDelay = 1000
      animateGame().then(() => {
        // wait for 500ms to show the Replay end modal
        waitFor(500).then(() => {
          dispatch({ type: 'replay_end' })
        })
      })
    }
    return
  }, [state.replay, animateGame])

  /**
   * Resets the state of GamePlay
   */
  const restUI = () => {
    // tslint:disable-next-line: no-increment-decrement
    for (let i: number = 0; i < 9; i++) {
      boxRefs[`box${i}`].buttonNode.innerHTML = `<span>-</span>`
      boxRefs[`box${i}`].buttonNode.disabled = false
    }
  }

  /**
   * callBack Func provided to @GameBox <Button />
   * that changes states of buttons
   */
  const btnCallBack = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // get the click button id
      const id: string = event.currentTarget.id
      boxRefs[id].buttonNode.innerHTML = `<span>${state.letter}</span>`
      boxRefs[id].buttonNode.disabled = true
      // dispatch the click event to React Hooks.
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

  /**
   * Stores all the @GameBox buttons,
   * for future references and accessing throguh ref of each @GameBox
   */
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
      {/* Generate the game grid 
        |----|----|----|
        |----|----|----|
        |----|----|----|      
      */}
      <Row>{items}</Row>
      {/* Success GameModal. Visible when a player wins the game */}
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
      {/* Error GameModal. Visible when match gets draw */}
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
      {/* Success GameModal. Visible when replay ends */}
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
          dispatch({ type: 'replay' })
        }}
        visible={state.replyModalVisible}
      />
    </Layout>
  )
}
export default GameGrid
