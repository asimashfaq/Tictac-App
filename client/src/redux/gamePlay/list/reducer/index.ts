import {
    GET_GAMEPLAYS_FAILURE,
    GET_GAMEPLAYS_REQUEST,
    GET_GAMEPLAYS_SUCCESS
  } from '../actions'
  
  export const INITIAL_STATE: any = {
    data: [],
    fetching: true,
    error: null,
  }
  
  export default (state = INITIAL_STATE, { type, payload }: rProps) => {
    switch (type) {
      case GET_GAMEPLAYS_REQUEST:
        return { ...state, fetching: true }
      case GET_GAMEPLAYS_SUCCESS:
        return { ...state, fetching: false, data: payload }
      case GET_GAMEPLAYS_FAILURE:
        return { ...state, fetching: false, error: payload.error }
      default:
        return state
    }
  }
  