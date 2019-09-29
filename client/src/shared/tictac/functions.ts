import { SuccessPattrens } from './constants'

export const CheckWinner: ICheckWinner = (dataset: Box[]): any => {
  if (dataset.length < 5) {
    return 'Not Valid'
  }

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
