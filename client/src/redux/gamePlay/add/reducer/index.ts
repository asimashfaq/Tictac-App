import { ADD_GAMEPLAY_REQUEST, ADD_GAMEPLAY_SUCCESS, ADD_GAMEPLAY_FAILURE } from '../actions'

export const INITIAL_STATE: any = {
  data: {
    winner: '',
    player1: '',
    player2: '',
    draw: true,
    boxes: [],
  },
  saving: false,
  error: null,
}
export default (state = INITIAL_STATE, { type, payload }: rProps) => {
  switch (type) {
    case ADD_GAMEPLAY_REQUEST:
      return { ...state, saving: true }
    case ADD_GAMEPLAY_SUCCESS:
      return { ...state, saving: false, data: payload }
    case ADD_GAMEPLAY_FAILURE:
      return { ...state, saving: false, error: payload.error }
    default:
      return state
  }
}
