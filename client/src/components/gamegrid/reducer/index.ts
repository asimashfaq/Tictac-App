import { InitalizeGame } from '../functions'

export const GAME_INITIALS: Game = InitalizeGame()

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
        letter: '-',
      }
    }
    case 'draw': {
      return {
        ...state,
        winnerPlayer: 0,
        drawModalVisible: true,
        player: 0,
        letter: '-',
      }
    }
    case 'replay': {
      return {
        ...state,
        replay: true,
        successModalVisible: false,
        drawModalVisible: false,
        replyModalVisible: false,
      }
    }
    case 'replay_end': {
      return {
        ...state,
        replyModalVisible: true,
        replay: false,
      }
    }
    case 'disable': {
      const bDisable: boolean[] = state.buttonDisable
      bDisable[action.payload] = true
      return {
        ...state,
        buttonDisable: bDisable,
      }
    }
    default: {
      return state
    }
  }
}
