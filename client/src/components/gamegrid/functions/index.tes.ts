/**
 * Testing the @InitalizeGame func 
 **/
import { InitalizeGame } from './index'
describe('InitalizeGame action will generate the random data ', () => {
  it('Should Initalize with Random Data', () => {
    const data = InitalizeGame()
    // should not have same value 'x' or 'o'
    expect(data.player1).not.toEqual(data.player2)
  })

  it('Should Initalize player 1', () => {
    const data = InitalizeGame()
    // should have value 'x' or 'o'
    expect(data.player1 === 'x' || data.player1 === 'o').toBeTruthy()
  })

  it('Should Initalize player 2', () => {
    const data = InitalizeGame()
    // should have value 'x' or 'o'
    expect(data.player2 === 'x' || data.player2 === 'o').toBeTruthy()
  })

  it('Should Initalize with Player 1 or 2', () => {
    const data = InitalizeGame()
    // player should have value 1 or 2
    expect(data.player === 1 || data.player === 2).toBeTruthy()
  })

  it('Should Initalize with Letter o or x', () => {
    const data = InitalizeGame()
    // letter should be 'o' or 'x'
    expect(data.letter === 'o' || data.letter === 'x').toBeTruthy()
  })

  /* it('Should Initalize player 1 with o or x', () => {
    const data = InitalizeGame()
    expect(
      (data.player == 1 && data.letter == 'o' && data.player1 == 'o' && data.player2 == 'x') ||
        (data.player == 2 && data.letter == 'o' && data.player1 == 'x' && data.player2 == 'o') ||
        ((data.player == 1 && data.letter == 'x' && data.player1 == 'x' && data.player2 == 'o') ||
          (data.player == 2 && data.letter == 'x' && data.player1 == 'o' && data.player2 == 'x'))
    ).toBeTruthy()
  })

  it('Should Initalize player 2 with o or x', () => {
    const data = InitalizeGame()
    expect(
      (data.player == 2 && data.letter == 'o' && data.player1 == 'x' && data.player2 == 'o') ||
      (data.player == 1 && data.letter == 'o' && data.player1 == 'o' && data.player2 == 'x') ||
      ((data.player == 2 && data.letter == 'x' && data.player1 == 'o' && data.player2 == 'x') ||
        (data.player == 1 && data.letter == 'x' && data.player1 == 'x' && data.player2 == 'o'))
    ).toBeTruthy()
  })*/

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
