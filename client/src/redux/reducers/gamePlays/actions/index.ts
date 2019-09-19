export const FETCH_LIST_REQUEST: 'FETCH_LIST_REQUEST' = 'FETCH_LIST_REQUEST'
export const FETCH_LIST_SUCCESS: 'FETCH_LIST_SUCCESS' = 'FETCH_LIST_SUCCESS'
export const FETCH_LIST_FAILURE: 'FETCH_LIST_FAILURE' = 'FETCH_LIST_FAILURE'
export const ADD_GAMEPLAY_REQUEST: 'ADD_GAMEPLAY_REQUEST' = 'ADD_GAMEPLAY_REQUEST'
export const ADD_GAMEPLAY_SUCCESS: 'ADD_GAMEPLAY_SUCCESS' = 'ADD_GAMEPLAY_SUCCESS'
export const ADD_GAMEPLAY_FAILURE: 'ADD_GAMEPLAY_FAILURE' = 'ADD_GAMEPLAY_FAILURE'

export const fetchListSuccess = (list: any) => ({
  type: FETCH_LIST_SUCCESS,
  payload: list,
})

export const fetchListStarted = () => ({
  type: FETCH_LIST_REQUEST,
})

export const fetListFailure = (error: any) => ({
  type: FETCH_LIST_FAILURE,
  payload: {
    error,
  },
})

export const addGamePlaySuccess = (id: any) => ({
  type: ADD_GAMEPLAY_SUCCESS,
  payload: id,
})

export const addGamePlayStarted = () => ({
  type: ADD_GAMEPLAY_REQUEST,
})

export const addGamePlayFailure = (error: any) => ({
  type: ADD_GAMEPLAY_FAILURE,
  payload: {
    error,
  },
})
