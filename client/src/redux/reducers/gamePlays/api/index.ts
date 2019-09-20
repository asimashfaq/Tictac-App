import axios from 'axios'
import {
  fetchListSuccess,
  fetListFailure,
  fetchListStarted,
  addGamePlayStarted,
  addGamePlaySuccess,
  addGamePlayFailure,
} from '../actions/index'
const globalAny: any = global

export const fetchList = () => {
  return (dispatch: any) => {
    dispatch(fetchListStarted())
    axios
      .get(`${globalAny.window._env_.API_URL}/gameplays`)
      .then(res => dispatch(fetchListSuccess(res.data)))
      .catch(err => {
        dispatch(fetListFailure(err.message))
      })
  }
}
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
