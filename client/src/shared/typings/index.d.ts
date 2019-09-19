interface iGamePlay {
  winner: string
  draw: boolean
  player2: string
  player1: string
  boxes: Box[]
}
interface iGamePlayList extends iGamePlay {
  id: string
}

interface rState {
  data: iGamePlay[]
  fetching: boolean
  error: any
}

interface rProps {
  type: string
  payload: any
}

interface Box {
  id: string
  player: number
  value: string
  step: number
}
interface Game {
  boxes: Box[]
  player: number
  player1: string
  player2: string
  step: number
  letter: string
  loading: boolean
  successModalVisible: boolean
  winnerPlayer: number
  buttonDisable: boolean[]
  replay: boolean
  replyModalVisible: boolean
  drawModalVisible: boolean
}
interface Winner {
  player: number
  draw: boolean
}
interface ICheckWinner {
  (dataset: Box[]): Winner
}
