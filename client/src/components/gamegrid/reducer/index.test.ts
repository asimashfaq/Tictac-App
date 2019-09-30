import { gameReducer, GAME_INITIALS_STATIC } from './index'
describe(`gamereducer`, () => {
  it(`returns the initial state correctly`, () => {
    const reducer = gameReducer(GAME_INITIALS_STATIC, { type: ``, payload: null })
    expect(reducer).toEqual(GAME_INITIALS_STATIC)
  })
  it(`handles reset as expected`, () => {
    const reducer = gameReducer(GAME_INITIALS_STATIC, {
      type: 'reset',
      payload: GAME_INITIALS_STATIC,
    })
    expect(reducer).toEqual(GAME_INITIALS_STATIC)
  })
  it(`handles click as expected`, () => {
    const reducer = gameReducer(GAME_INITIALS_STATIC, {
      type: 'click',
      payload: {
        id: 'box0',
        player: 1,
        value: `x`,
        step: 1,
      },
    })

    expect(reducer).toEqual({
      step: 2,
      letter: 'o',
      player: 2,
      player1: 'x',
      player2: 'o',
      winnerPlayer: 0,
      boxes: [
        {
          id: 'box0',
          player: 1,
          value: `x`,
          step: 1,
        },
      ],
      successModalVisible: false,
      replyModalVisible: false,
      drawModalVisible: false,
      replay: false,
      loading: false,
    })
  })

  it(`handles winner as expected`, () => {
    const reducer = gameReducer(GAME_INITIALS_STATIC, {
      type: 'winner',
      payload: 1,
    })

    expect(reducer).toEqual({
      step: 0,
      letter: '-',
      player: 0,
      player1: 'x',
      player2: 'o',
      winnerPlayer: 1,
      boxes: [],
      successModalVisible: true,
      replyModalVisible: false,
      drawModalVisible: false,
      replay: false,
      loading: false,
    })
  })
  it(`handles draw as expected`, () => {
    const reducer = gameReducer(GAME_INITIALS_STATIC, {
      type: 'draw',
    })

    expect(reducer).toEqual({
      step: 0,
      letter: '-',
      player: 0,
      player1: 'x',
      player2: 'o',
      winnerPlayer: 0,
      boxes: [],
      successModalVisible: false,
      replyModalVisible: false,
      drawModalVisible: true,
      replay: false,
      loading: false,
    })
  })

  it(`handles replay as expected`, () => {
    const reducer = gameReducer(GAME_INITIALS_STATIC, {
      type: 'replay',
    })

    expect(reducer).toEqual({
      step: 0,
      letter: 'x',
      player: 1,
      player1: 'x',
      player2: 'o',
      winnerPlayer: 0,
      boxes: [],
      successModalVisible: false,
      replyModalVisible: false,
      drawModalVisible: false,
      replay: true,
      loading: false,
    })
  })

  it(`handles replay_end as expected`, () => {
    const reducer = gameReducer(GAME_INITIALS_STATIC, {
      type: 'replay_end',
    })

    expect(reducer).toEqual({
      step: 0,
      letter: 'x',
      player: 1,
      player1: 'x',
      player2: 'o',
      winnerPlayer: 0,
      boxes: [],
      successModalVisible: false,
      replyModalVisible: true,
      drawModalVisible: false,
      replay: false,
      loading: false,
    })
  })
})
