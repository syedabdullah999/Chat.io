import {React, useEffect,useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../App.css";
import "./Home"
import { Form, Input, Button, Checkbox, Divider } from "antd";
import axios from "axios";
import { useSelector, useDispatch, connect } from 'react-redux';
import { loginAction } from '../actions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'antd/dist/antd.css';
import '../index.css';
import { List, Avatar } from 'antd';


function ChatBox(){

console.log("chat box componenet");


return (
    <div className="chat-box">
    <h1>Hello</h1>
    </div>
)

}

export default ChatBox;