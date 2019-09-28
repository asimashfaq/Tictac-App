import {
    GET_GAMEPLAY_REQUEST,
    GET_GAMEPLAY_SUCCESS,
    GET_GAMEPLAY_FAILURE,
    GET_GAMEPLAY_RESET,
  } from '../actions'
  
  export const INITIAL_STATE: any = {
    
    fetching: true,
    error: null,
    data: {
      winner: '0',
      player1: '-',
      player2: '-',
      boxes: [],
      draw: true,
    },
  }
  
  export default (state = INITIAL_STATE, { type, payload }: rProps) => {
    switch (type) {
      case GET_GAMEPLAY_RESET:
       return INITIAL_STATE
      case GET_GAMEPLAY_REQUEST:
        return { ...state, fetching: true }
      case GET_GAMEPLAY_SUCCESS:
        return { ...state, fetching: false, data: payload }
      case GET_GAMEPLAY_FAILURE:
        return { ...state, fetching: false, error: payload.error }
      default:
        return state
    }
  }
  