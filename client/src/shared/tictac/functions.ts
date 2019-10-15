import { SuccessPattrens } from './constants'
/**
 * @func CheckWinner check the winner base on the dataset pass.
 * @param dataset Gameplay dataset
 **/
export const CheckWinner: ICheckWinner = (dataset: Box[]): any => {
  // minium dataset of length 6 is required to find the winner
  if (dataset.length < 5) {
    return 'Not Valid'
  }
  // initialize
  let winningPlayer: Winner = { player: 0, draw: true }
  // check the dataset against each winning pattren
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
        // found the winner
        winningPlayer = { player: dataset[pattren[0]].player, draw: false }
        return
      }
    }
  })
  return winningPlayer
}
