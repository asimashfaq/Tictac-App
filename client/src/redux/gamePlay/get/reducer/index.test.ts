import {
  GET_GAMEPLAY_FAILURE,
  GET_GAMEPLAY_REQUEST,
  GET_GAMEPLAY_SUCCESS,
  GET_GAMEPLAY_RESET,
} from '../actions'
import gamePlayReducer, { INITIAL_STATE } from './index'

describe('gamePlayReducer', () => {
  it(`returns the initial state correctly`, () => {
    const reducer = gamePlayReducer(undefined, { type: ``, payload: null })
    expect(reducer).toEqual(INITIAL_STATE)
  })

  it('handles GET_GAMEPLAY_REQUEST as expected', () => {
    const reducer = gamePlayReducer(INITIAL_STATE, {
      type: GET_GAMEPLAY_REQUEST,
      payload: undefined,
    })

    expect(reducer).toEqual({
      data: {
        winner: '0',
        player1: '-',
        player2: '-',
        boxes: [],
        draw: true,
      },
      fetching: true,
      error: null,
    })
  })

  it('handles GET_GAMEPLAY_RESET as expected', () => {
    const reducer = gamePlayReducer(INITIAL_STATE, { type: GET_GAMEPLAY_RESET, payload: undefined })
    expect(reducer).toEqual(INITIAL_STATE)
  })

  it('handles GET_GAMEPLAY_SUCCESS as expected', () => {
    const reducer = gamePlayReducer(INITIAL_STATE, {
      type: GET_GAMEPLAY_SUCCESS,
      payload: {
        boxes: [
          {
            id: 'box0',
          },
        ],
        player1: '1',
      },
    })

    expect(reducer).toEqual({
      data: {
        boxes: [
          {
            id: 'box0',
          },
        ],
        player1: '1',
      },
      fetching: false,
      error: null,
    })
  })

  it('handles GET_GAMEPLAY_FAILURE as expected', () => {
    const reducer = gamePlayReducer(INITIAL_STATE, {
      type: GET_GAMEPLAY_FAILURE,
      payload: {
        error: 'Some thing went wrong',
      },
    })

    expect(reducer).toEqual({
      data: {
        winner: '0',
        player1: '-',
        player2: '-',
        boxes: [],
        draw: true,
      },
      fetching: false,
      error: 'Some thing went wrong',
    })
  })
})
