import { InitalizeGame } from '../functions'

export const GAME_INITIALS: Game = InitalizeGame()
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
      return action.payload
    case 'click': {
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
      return {
        ...state,
        winnerPlayer: action.payload,
        successModalVisible: true,
        player: 0,
        step:0,
        letter: '-',
      }
    }
    case 'draw': {
      return {
        ...state,
        winnerPlayer: 0,
        drawModalVisible: true,
        player: 0,
        step:0,
        letter: '-',
      }
    }
    case 'replay': {
      return {
        ...state,
        replay: true,
        successModalVisible: false,
        drawModalVisible: false,
        step:0,
        replyModalVisible: false,
      }
    }
    case 'replay_end': {
      return {
        ...state,
        replyModalVisible: true,
        replay: false,
        step:0,
      }
    }
    default: {
      return state
    }
  }
}
