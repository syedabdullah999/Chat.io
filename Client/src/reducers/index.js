import SignIn from './Sign-In'
import { chatName } from './chatName';
import {combineReducers} from 'redux'
import { ProcessReducer } from "./process";
import Messages from './Messages';

const allReducers = combineReducers({
  ProcessReducer: ProcessReducer,
  chatName: chatName,
  SignIn : SignIn,
  Messages: Messages
})

export default allReducers;