import axios from 'axios'
import {
  fetchListSuccess,
  fetListFailure,
  fetchListStarted,
  addGamePlayStarted,
  addGamePlaySuccess,
  addGamePlayFailure,
} from '../actions/index'
import { URL } from '../../../../configs/config'
export const fetchList = () => {
  return (dispatch: any) => {
    dispatch(fetchListStarted())
    axios
      .get(`${URL}/gameplays`)
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
      .post(`${URL}/gameplay`, data)
      .then(res => {
        dispatch(addGamePlaySuccess(res.data.id))
      })
      .catch(err => {
        dispatch(addGamePlayFailure(err.message))
      })
  }
}
