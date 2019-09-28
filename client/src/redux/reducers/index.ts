import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import gamePlayReducer from '../gamePlay'
export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    gameplay: gamePlayReducer,
  })
