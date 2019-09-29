export const GET_GAMEPLAYS_REQUEST: 'GET_GAMEPLAYS_REQUEST' = 'GET_GAMEPLAYS_REQUEST'
export const GET_GAMEPLAYS_SUCCESS: 'GET_GAMEPLAYS_SUCCESS' = 'GET_GAMEPLAYS_SUCCESS'
export const GET_GAMEPLAYS_FAILURE: 'GET_GAMEPLAYS_FAILURE' = 'GET_GAMEPLAYS_FAILURE'


export const getGamePlaysSuccess = (list: any) => ({
  type: GET_GAMEPLAYS_SUCCESS,
  payload: list,
})

export const getGamePlaysStarted = () => ({
  type: GET_GAMEPLAYS_REQUEST,
})

export const getGamePlaysFailure = (error: any) => ({
  type: GET_GAMEPLAYS_FAILURE,
  payload: {
    error,
  },
})

