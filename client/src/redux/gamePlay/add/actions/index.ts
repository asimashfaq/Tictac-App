export const ADD_GAMEPLAY_REQUEST: 'ADD_GAMEPLAY_REQUEST' = 'ADD_GAMEPLAY_REQUEST'
export const ADD_GAMEPLAY_SUCCESS: 'ADD_GAMEPLAY_SUCCESS' = 'ADD_GAMEPLAY_SUCCESS'
export const ADD_GAMEPLAY_FAILURE: 'ADD_GAMEPLAY_FAILURE' = 'ADD_GAMEPLAY_FAILURE'


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