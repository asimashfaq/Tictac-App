import { CheckWinner } from './functions'
describe('CheckWinner action will check for winner', () => {
  it('CheckWinner Should Return Not Valid Data', () => {
    const data = [
      { id: 'box0', player: 2, value: 'x', step: 0 },
      { id: 'box1', player: 1, value: 'o', step: 1 },
      { id: 'box4', player: 2, value: 'x', step: 2 },
      { id: 'box2', player: 1, value: 'o', step: 3 },
    ]

    const expected: string = 'Not Valid'
    const result = CheckWinner(data)
    expect(result).toEqual(expected)
  })

  it('CheckWinner Should Return the Winner', () => {
    const data = [
      { id: 'box0', player: 2, value: 'x', step: 0 },
      { id: 'box1', player: 1, value: 'o', step: 1 },
      { id: 'box4', player: 2, value: 'x', step: 2 },
      { id: 'box2', player: 1, value: 'o', step: 3 },
      { id: 'box8', player: 2, value: 'x', step: 4 },
    ]

    const expected: Winner = { draw: false, player: 2 }
    const result = CheckWinner(data)
    expect(result).toEqual(expected)
  })

  it('CheckWinner Should Return the Draw', () => {
    const data = [
      { id: 'box0', player: 2, value: 'o', step: 0 },
      { id: 'box1', player: 1, value: 'x', step: 1 },
      { id: 'box4', player: 2, value: 'o', step: 2 },
      { id: 'box3', player: 1, value: 'x', step: 3 },
      { id: 'box6', player: 2, value: 'o', step: 4 },
      { id: 'box2', player: 1, value: 'x', step: 5 },
      { id: 'box5', player: 2, value: 'o', step: 6 },
      { id: 'box8', player: 1, value: 'x', step: 7 },
      { id: 'box7', player: 2, value: 'o', step: 8 },
    ]

    const expected: Winner = { draw: true, player: 0 }
    const result = CheckWinner(data)
    expect(result).toEqual(expected)
  })
})
