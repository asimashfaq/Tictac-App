import { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE } from './actions'

const INITIAL_STATE: rState = { data: [], fetching: true, error: null }

export default (state = INITIAL_STATE, { type, payload }: rProps) => {
  switch (type) {
    case FETCH_LIST_REQUEST:
      return { ...state, fetching: true }
    case FETCH_LIST_SUCCESS:
      return { ...state, fetching: false, data: payload }
    case FETCH_LIST_FAILURE:
      return { ...state, fetching: false, error: payload.error }
    default:
      return state
  }
}
