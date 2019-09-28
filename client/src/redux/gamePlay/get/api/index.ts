import axios from 'axios'
import {
  getGamePlayFailure,
  getGamePlayStarted,
  getGamePlaySuccess,
} from '../actions/index'

const globalAny: any = global

export const getGamePlay = (id: string) => {
    return async (dispatch: any) => {
      dispatch(getGamePlayStarted())
  
      await axios
        .get(`${globalAny.window._env_.API_URL}/gameplay/${id}`)
        .then(res => {
          dispatch(getGamePlaySuccess(res.data))
        })
        .catch(err => {
          dispatch(getGamePlayFailure(err.message))
        })
    }
  }
  