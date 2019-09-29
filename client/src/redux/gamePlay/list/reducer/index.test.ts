import { GET_GAMEPLAYS_FAILURE, GET_GAMEPLAYS_REQUEST, GET_GAMEPLAYS_SUCCESS } from '../actions'
import gamePlayListReducer, { INITIAL_STATE } from './index'

describe('gamePlayListReducer', () => {
  it('returns the initial state correctly', () => {
    const reducer = gamePlayListReducer(undefined, {} as rProps)
    expect(reducer).toEqual(INITIAL_STATE)
  })

  it('handles GET_GAMEPLAYS_REQUEST as expected', () => {
    const reducer = gamePlayListReducer(INITIAL_STATE, {
      type: GET_GAMEPLAYS_REQUEST,
      payload: undefined,
    })

    expect(reducer).toEqual({
      data: [],
      fetching: true,
      error: null,
    })
  })

  it('handles GET_GAMEPLAYS_SUCCESS as expected', () => {
    const reducer = gamePlayListReducer(INITIAL_STATE, {
      type: GET_GAMEPLAYS_SUCCESS,
      payload: [
        {
          boxes: [
            {
              id: 'box0',
            },
          ],
          player1: '1',
        },
      ],
    })

    expect(reducer).toEqual({
      data: [
        {
          boxes: [
            {
              id: 'box0',
            },
          ],
          player1: '1',
        },
      ],
      fetching: false,
      error: null,
    })
  })

  it('handles GET_GAMEPLAYS_FAILURE as expected', () => {
    const reducer = gamePlayListReducer(INITIAL_STATE, {
      type: GET_GAMEPLAYS_FAILURE,
      payload: {
        error: 'Some thing went wrong',
      },
    })

    expect(reducer).toEqual({
      data: [],
      fetching: false,
      error: 'Some thing went wrong',
    })
  })
})
