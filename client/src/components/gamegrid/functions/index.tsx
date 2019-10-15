/**
 *  Initialize the Game
 *  Generate the Random Player Number to start game 1 or 2
 *  Generate the Random Letter 'x' or 'o'
 *  Assign both players either 'x' or 'o'
 * **/
export const InitalizeGame = (): Game => {
  // assign value 1 or 2 by Generating the Random Number and taking its modulus
  // check the modulus return value mostly between 1.2xx ot 1.4xxx
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
