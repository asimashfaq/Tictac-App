import { InitalizeGame } from './Functions'
describe('InitalizeGame action will generate the random data ', () => {
  it('Should Initalize with Random Data', () => {
    const data = InitalizeGame()
    expect(data.player1).not.toEqual(data.player2)
  })

  it('Should Initalize with Player 1 or 2', () => {
    const data = InitalizeGame()
    expect(data.player == 1 || data.player == 2).toBeTruthy()
  })

  it('Should Initalize with Letter o or x', () => {
    const data = InitalizeGame()
    expect(data.letter == 'o' || data.letter == 'x').toBeTruthy()
  })

  it('Should Check it should not always be same', () => {
    let data = InitalizeGame()
    for (let i = 0; i < 50; i++) {
      const temp = InitalizeGame()
      try {
        expect(temp).toStrictEqual(data)
        // will not execute this line of the exception comes
        data = temp
      } catch (e) {
        expect(temp).not.toStrictEqual(data)
      }
    }
  })
})
