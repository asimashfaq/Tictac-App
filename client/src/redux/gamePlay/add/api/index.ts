import axios from 'axios'
import {
  addGamePlayStarted,
  addGamePlaySuccess,
  addGamePlayFailure,
} from '../actions/index'

const globalAny: any = global

export const addGamePlay = (data: iGamePlay) => {
    return (dispatch: any) => {
      dispatch(addGamePlayStarted())
      axios
        .post(`${globalAny.window._env_.API_URL}/gameplay`, data)
        .then(res => {
          dispatch(addGamePlaySuccess(res.data.id))
        })
        .catch(err => {
          dispatch(addGamePlayFailure(err.message))
        })
    }
  }