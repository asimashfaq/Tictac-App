import axios from 'axios'
import { addGamePlayStarted, addGamePlaySuccess, addGamePlayFailure } from '../actions/index'

const globalAny: any = global

export const addGamePlay = (data: iGamePlay) => (dispatch: any) => {
  dispatch(addGamePlayStarted())
  return axios
    .post(`${globalAny.window._env_.API_URL}/gameplay`, data)
    .then(res => {
      dispatch(addGamePlaySuccess(res.data.id))
      return res
    })
    .catch(err => {
      dispatch(addGamePlayFailure(err.message))
      return err
    })
}
