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
    replay: false,
    replyModalVisible: false,
    drawModalVisible: false,
  }
}
