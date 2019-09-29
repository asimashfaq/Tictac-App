import axios from 'axios'
import { getGamePlaysFailure, getGamePlaysStarted, getGamePlaysSuccess } from '../actions/index'

const globalAny: any = global

export const getGamePlays = () => (dispatch: any) => {
  dispatch(getGamePlaysStarted())
  return axios
    .get(`${globalAny.window._env_.API_URL}/gameplays`)
    .then(res => {
      dispatch(getGamePlaysSuccess(res.data))
      return res
    })
    .catch(err => {
      dispatch(getGamePlaysFailure(err.message))
    })
}
