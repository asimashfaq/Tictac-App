import axios from 'axios'
import {
  fetchListSuccess,
  fetListFailure,
  fetchListStarted,
  addGamePlayStarted,
  addGamePlaySuccess,
  addGamePlayFailure,
  getGamePlayFailure,
  getGamePlayStarted,
  getGamePlaySuccess,
} from '../actions/index'
import { async } from 'q';

const globalAny: any = global

export const fetchList = () => (dispatch: any) => {
    dispatch(fetchListStarted())
   return axios
      .get(`${globalAny.window._env_.API_URL}/gameplays`)
      .then(res => {
        dispatch(fetchListSuccess(res.data))
        return res
      })
      .catch(err => {
        dispatch(fetListFailure(err.message))
      })
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
export const getGamePlay = (id: string) => {
  return async (dispatch: any) => {
    dispatch(getGamePlayStarted())

    await axios
      .get(`${globalAny.window._env_.API_URL}/gameplay/${id}`)
      .then(res => {
        console.log("-----",res)
        dispatch(getGamePlaySuccess(res.data))
      })
      .catch(err => {
        dispatch(getGamePlayFailure(err.message))
      })
  }
}
