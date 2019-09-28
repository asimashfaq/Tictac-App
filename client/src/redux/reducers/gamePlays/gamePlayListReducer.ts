import {
  FETCH_LIST_REQUEST,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILURE,
  GET_GAMEPLAY_REQUEST,
  GET_GAMEPLAY_SUCCESS,
  GET_GAMEPLAY_FAILURE,
} from './actions'

export const INITIAL_STATE: rState = {
  data: [],
  fetching: true,
  error: null,
  gameplay: {
    winner: '0',
    player1: '-',
    player2: '-',
    boxes: [],
    draw: true,
  },
}

export default (state = INITIAL_STATE, { type, payload }: rProps) => {
  switch (type) {
    case FETCH_LIST_REQUEST:
      return { ...state, fetching: true }
    case FETCH_LIST_SUCCESS:
      return { ...state, fetching: false, data: payload }
    case FETCH_LIST_FAILURE:
      return { ...state, fetching: false, error: payload.error }
    case GET_GAMEPLAY_REQUEST:
      return { ...state, fetching: true }
    case GET_GAMEPLAY_SUCCESS:
      return { ...state, fetching: false, gameplay: payload }
    case GET_GAMEPLAY_FAILURE:
      return { ...state, fetching: false, error: payload.error }

    default:
      return state
  }
}
