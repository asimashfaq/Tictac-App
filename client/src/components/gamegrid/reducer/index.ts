/**
 * @gameReducer store the state of game.
 * Update state of the game as players play the game.
 **/

import { InitalizeGame } from '../functions'
// Randomly Initialize the game.
export const GAME_INITIALS: Game = InitalizeGame()
// Static Game Initialize  used for testing.
export const GAME_INITIALS_STATIC: Game = {
  boxes: [],
  player: 1,
  letter: 'x',
  player1: 'x',
  player2: 'o',
  step: 1,
  loading: false,
  successModalVisible: false,
  winnerPlayer: 0,
  replay: false,
  replyModalVisible: false,
  drawModalVisible: false,
}

export const gameReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'reset':
      // reset the game with payload pass to the reducer
      // discrad the previous state
      return action.payload
    case 'click': {
      // save the payload the boxes array
      // update the player and letter value to change the player handle
      const box: Box = action.payload
      return {
        ...state,
        boxes: [...state.boxes, box],
        step: state.step + 1,
        player: state.player === 1 ? 2 : 1,
        letter: state.letter === 'x' ? 'o' : 'x',
      }
    }
    case 'winner': {
      // save the winning player and show the  success modal
      return {
        ...state,
        winnerPlayer: action.payload,
        successModalVisible: true,
        player: 0,
        step: 0,
        letter: '-',
      }
    }
    case 'draw': {
      // show the draw modal and update to state
      return {
        ...state,
        winnerPlayer: 0,
        drawModalVisible: true,
        player: 0,
        step: 0,
        letter: '-',
      }
    }
    case 'replay': {
      // replay the game and hide draw or success modal
      return {
        ...state,
        replay: true,
        successModalVisible: false,
        drawModalVisible: false,
        step: 0,
        replyModalVisible: false,
      }
    }
    case 'replay_end': {
      // show the replay end modal.
      return {
        ...state,
        replyModalVisible: true,
        replay: false,
        step: 0,
      }
    }
    default: {
      return state
    }
  }
}
