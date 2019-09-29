import { ADD_GAMEPLAY_FAILURE, ADD_GAMEPLAY_REQUEST, ADD_GAMEPLAY_SUCCESS } from '../actions'
import gamePlayAddReducer, { INITIAL_STATE } from './index'

describe('gamePlayReducer', () => {
  it(`returns the initial state correctly`, () => {
    const reducer = gamePlayAddReducer(undefined, { type: ``, payload: null })
    expect(reducer).toEqual(INITIAL_STATE)
  })

  it(`handles GET_GAMEPLAY_REQUEST as expected`, () => {
    const reducer = gamePlayAddReducer(INITIAL_STATE, {
      type: ADD_GAMEPLAY_REQUEST,
      payload: undefined,
    })

    expect(reducer).toEqual({
      data: {
        winner: '',
        player1: '',
        player2: '',
        draw: true,
        boxes: [],
      },
      saving: true,
      error: null,
    })
  })

  it('handles GET_GAMEPLAY_SUCCESS as expected', () => {
    const reducer = gamePlayAddReducer(INITIAL_STATE, {
      type: ADD_GAMEPLAY_SUCCESS,
      payload: {
        winner: '1',
        player1: 'o',
        player2: 'x',
        draw: true,
        boxes: [],
      },
    })

    expect(reducer).toEqual({
      data: {
        winner: '1',
        player1: 'o',
        player2: 'x',
        draw: true,
        boxes: [],
      },
      saving: false,
      error: null,
    })
  })

  it('handles ADD_GAMEPLAY_FAILURE as expected', () => {
    const reducer = gamePlayAddReducer(INITIAL_STATE, {
      type: ADD_GAMEPLAY_FAILURE,
      payload: {
        error: 'Some thing went wrong',
      },
    })

    expect(reducer).toEqual({
      data: {
        winner: '',
        player1: '',
        player2: '',
        boxes: [],
        draw: true,
      },
      saving: false,
      error: 'Some thing went wrong',
    })
  })
})
