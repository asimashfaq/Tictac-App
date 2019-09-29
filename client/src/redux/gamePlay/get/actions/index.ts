export const GET_GAMEPLAY_REQUEST: 'GET_GAMEPLAY_REQUEST' = 'GET_GAMEPLAY_REQUEST'
export const GET_GAMEPLAY_SUCCESS: 'GET_GAMEPLAY_SUCCESS' = 'GET_GAMEPLAY_SUCCESS'
export const GET_GAMEPLAY_FAILURE: 'GET_GAMEPLAY_FAILURE' = 'GET_GAMEPLAY_FAILURE'
export const GET_GAMEPLAY_RESET: 'GET_GAMEPLAY_RESET' = 'GET_GAMEPLAY_RESET'

export const getGamePlaySuccess = (data: any) => ({
  type: GET_GAMEPLAY_SUCCESS,
  payload: data,
})

export const getGamePlayStarted = () => ({
  type: GET_GAMEPLAY_REQUEST,
})

export const getGamePlayReset = () => ({
  type: GET_GAMEPLAY_RESET,
})

export const getGamePlayFailure = (error: any) => ({
  type: GET_GAMEPLAY_FAILURE,
  payload: {
    error,
  },
})
