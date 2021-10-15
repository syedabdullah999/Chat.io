import SignIn from './Sign-In'
import { chatName } from './chatName';
import {combineReducers} from 'redux'
import { ProcessReducer } from "./process";

const allReducers = combineReducers({
  ProcessReducer: ProcessReducer,
  chatName: chatName,
  SignIn : SignIn
})

export default allReducers;