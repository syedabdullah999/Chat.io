import { React, useEffect, useState } from "react";
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
import ChatBox from "./ChatBox"

import 'antd/dist/antd.css';
import '../index.css';
import { List, Avatar } from 'antd';
import Headers from "./Headers";
import { Layout, Menu, Breadcrumb } from 'antd';
import Chat from "./Chat";



import Loader from "./Loader";
import BackGround from "./Background";
import UsersList from "./UsersList";
toast.configure()


function Home({ socket }) {
  const dispatch = useDispatch();

  const name = useSelector(state => state.SignIn.token.name)
  const { Header, Content, Footer } = Layout;
  const [chat, setChat] = useState(false)
  // const [roomname, setRoomName] = useState("Global")
  // const [username, setUserName] = useState()


  
  // console.log("A");
  // // setRoomName("Global")
  // // setUserName(name)
  // let username = name;
  // let roomname = "Global"
  // console.log(roomname);
  // console.log(username);
  // if (username != "" && roomname !="") {
  //   console.log("B");
  //   // setsocketCon(socket)
  //   socket.emit("joinRoom", { username, roomname });
  //   console.log("c");
  // } else {
  //   alert("username and roomname are must !");
  //   // window.location.reload();
  // }

  // console.log(roomname);

  

  return (
    <div className="Home">
      <Headers socket={socket}/>
      
      <UsersList socket={socket}/>
      <Footer className="footer" style={{ textAlign: 'center end' }}>Chat.io ©2021 Created by Syed Abdullah</Footer>
      {/* <BackGround /> */}
    </div>
  )
}

export default Home;

