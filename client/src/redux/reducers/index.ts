import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import gamePlayReducer from './gamePlays/gamePlayListReducer'
import gamePlayAddReducer from './gamePlays/add/gamePlayAddReducer'
export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    gameplaylist: gamePlayReducer,
    gameplayadd: gamePlayAddReducer,
  })
