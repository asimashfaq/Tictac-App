import axios from 'axios'
import { getGamePlaysFailure, getGamePlaysStarted, getGamePlaysSuccess } from '../actions/index'

const globalAny: any = global

export const getGamePlays = () => (dispatch: any) => {
  dispatch(getGamePlaysStarted())
  console.log(`${globalAny.window._env_.API_URL}/gameplays`)
  return axios
    .get(`${globalAny.window._env_.API_URL}/gameplays`)
    .then(res => {
      console.log(JSON.stringify(res.data))
      dispatch(getGamePlaysSuccess(res.data))
      return res
      // return res
    })
    .catch(err => {
      dispatch(getGamePlaysFailure(err.message))
      return err
    })
}
