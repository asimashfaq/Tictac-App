import { SuccessPattrens } from '../props'

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const CheckWinner: ICheckWinner = (dataset: Box[]): Winner => {
  let winningPlayer: Winner = { player: 0, draw: true }
  SuccessPattrens.forEach(pattren => {
    const f1 = dataset.filter(data => {
      return (
        data.id === `box${pattren[0]}` ||
        data.id === `box${pattren[1]}` ||
        data.id === `box${pattren[2]}`
      )
    })
    if (f1.length === 3) {
      if (f1[0].value === f1[1].value && f1[0].value === f1[2].value) {
        winningPlayer = { player: dataset[pattren[0]].player, draw: false }
        return
      }
    }
  })
  return winningPlayer
}
export const gameReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'reset':
      return action.payload
    case 'click': {
      const box: Box = action.payload
      const buttonIndex: number = parseInt(box.id.slice(-1), 10)
      const bDisable = state.buttonDisable
      bDisable[buttonIndex] = true
      return {
        ...state,
        boxes: [...state.boxes, box],
        step: state.step + 1,
        player: state.player === 1 ? 2 : 1,
        letter: state.letter === 'x' ? 'o' : 'x',
        buttonDisable: bDisable,
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
        buttonDisable: [false, false, false, false, false, false, false, false, false],
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

export const InitalizeGame = (): Game => {
  const Player: number = (new Date().getTime() + Math.random()) % 2 > 1.3 ? 1 : 2
  const Letter: string =
    ((new Date().getTime() + Math.random()) % 2 < 1.1 ? 1 : 2) === 1 ? 'x' : 'o'
  return {
    boxes: [],
    player: Player,
    letter: Letter,
    player1: Player === 1 ? Letter : Letter === 'x' ? 'o' : 'x',
    player2: Player === 2 ? Letter : Letter === 'x' ? 'o' : 'x',
    step: 0,
    loading: false,
    successModalVisible: false,
    winnerPlayer: 0,
    buttonDisable: [false, false, false, false, false, false, false, false, false],
    replay: false,
    replyModalVisible: false,
    drawModalVisible: false,
  }
}
