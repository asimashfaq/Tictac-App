import { combineReducers } from 'redux'
import gamePlayAddReducer from './add/reducer'
import gamePlayListReducer from './list/reducer'
import gamePlayGetReducer from './get/reducer'
const GamePlayReducers = combineReducers({
  add: gamePlayAddReducer,
  list: gamePlayListReducer,
  get: gamePlayGetReducer,
})
export default GamePlayReducers
