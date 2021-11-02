import { React, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import "../App.css";
import "./Home"
import { Form, Input, Button, Checkbox, Divider } from "antd";
import axios from "axios";
import { useSelector, useDispatch, connect } from 'react-redux';
import { loginAction } from '../actions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatBox from "./ChatBox"
import 'antd/dist/antd.css';
import '../index.css';
import { List, Avatar } from 'antd';
import Headers from "./Headers";
import { Layout, Menu, Breadcrumb,Image } from 'antd';
import Chat from "./Chat";
import Loader from "./Loader";
import BackGround from "./Background";
import UsersList from "./UsersList";
import BackgroundImage from "./backgroundImage";
import Calendar2 from "./Callender"

toast.configure()



function Home({ socket }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const name = useSelector(state => state.SignIn.token.name)
  const { Header, Content, Footer } = Layout;
  const [chat, setChat] = useState(false)
  // const [roomname, setRoomName] = useState("Global")
  // const [username, setUserName] = useState()


  // useEffect(() => {
  //   history.push(`/`)
  // }, [socket]);
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('user'));
    if(user == null){
      history.push(`/`)
    }
    
  }, []);

  return (
    <>

      <Headers socket={socket} />
      <UsersList socket={socket} />

      <Footer className="footer" style={{ backgroundColor:'rgb(33, 15, 53) ', textAlign: 'center end',color: "#b7acac"}}>Chat.io ©2021 Created by Syed Abdullah</Footer>

      
    
    </>
  )
}

export default Home;

