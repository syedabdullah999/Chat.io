import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { PageHeader, Button, Descriptions, Menu, Dropdown } from 'antd';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Header } from 'antd/lib/layout/layout';
// import { socket } from 'socket.io-client';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, useHistory, Route } from "react-router-dom";
import io from "socket.io-client";
import axios from 'axios';
import { loginAction } from '../actions'
import Login from './Login';
import ChatComponent from './ChatComponenet';
import CreateGroup from './CreateGroup';
import { PoweroffOutlined } from '@ant-design/icons';
import Home from './Home';
import Loader from './Loader';

// import SocketCon from './SocketCon';
// import { Socket } from 'socket.io-client';


// let socket = io.connect('/');

function Headers({ socket }) {

  const history = useHistory();
  // useEffect(() => {
  // Update the document title using the browser API

  // });


  const dispatch = useDispatch();


  const token = useSelector(state => state.SignIn.token.token)
  // const [box, setBox] = useState(false)
  // console.log("store item", token);


  const name = useSelector(state => state.SignIn.token.name)
  const [roomname, setRoomName] = useState("Global")
  const [username, setUserName] = useState(name)
  const [socketOn, setsocketOn] = useState(true)
  const [socketCon, setsocketCon] = useState()
  const [signout, setSignout] = useState(false)
  const [group, setGroup] = useState(false)
  const [create, setCreate] = useState(true)
  const [refresh, setRefresh] = useState(false)
  // console.log("store item", name);
  const [load, setLoader] = useState(false)
  const [showHome, setHome] = useState(false)
  // console.log("inside Header");

  const logout = () => {

    
        localStorage.clear();
        history.push("/")
      
    


  }


  // if(signout){
  //   return(
  //     <Login/>
  //   )
  // }


  const GlobalChat = () => {

    console.log("in global chat function");

    // axios.get('http://localhost:4000/socket', { headers: { "Authorization": `Bearer ${token}` } })
    // .then(res => {
    //   setsocketOn(true)
    //   console.log(socketOn,"socket on");
    //   console.log(res,"hellooooooooo");

    // }).catch((e) => {

    //   console.log("error response", e)

    // }
    // )


    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////




    // // if(socketOn){
    // console.log("A");
    // setRoomName("Global")
    // setUserName(name)
    // console.log(roomname);
    // console.log(username);
    // if (username != "" && roomname !="") {
    //   console.log("B");
    //   // setsocketCon(socket)
    //   socket.emit("joinRoom", { username, roomname });
    //   console.log("c");
    // } else {
    //   alert("username and roomname are must !");
    //   window.location.reload();
    // }

    // console.log(roomname);










    /////////////////////////////////
    ////////////////////////////////
    ////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
  }

  // socket.on("server message", function(message) {
  //   var people = JSON.parse(message);
  //   console.log("server message : ",people);
  //   return(
  //     <ChatComponent people={people} />
  //   )
  // })
  // }


  const Reset = () => {
    setRefresh(true)
  }
  if (refresh) {
    console.log("refreshing page");
    setRefresh(false)
    history.push('/home')
    
  }

  const Group = () => {
    setCreate(false)
    setGroup(true)
    
  }

  function handleMenuClick(e) {
    console.log('click', e);
  }
  const menu = () =>{
    localStorage.clear();
    setLoader(true)
    setGroup(false)
    history.push("/")
  }

  // if(load){
  //   return(
  //   <Loader
  //       {...setTimeout(() => {
  //         setLoader(false)
          
  //         history.push(`/`)

  //       }, 1000)}
  //       />

  //       )
  //     }
  

  if (group) {
    return (
      <CreateGroup
        show={group}
        socket={socket}
      // onHide={() => setModalShow(false)}
      />
    )
  }
  return (
    <>
      {/* <SocketCon socket={socket} /> */}
      <div className="headerFix">
      <PageHeader
        className="site-page-header"
        
        // {...<Button>sss</Button>}
        onBack={logout}
        title={<strong><a onClick={Reset}> {name} </a></strong>}
        subTitle="Welcome To Chat.io"
        // PageHeader="sss"
        extra={[<Link to={`/chat/${roomname}/${username}`} >
          <Button key="1" type="primary" onClick={GlobalChat} style={{ background: "DarkSlateGrey", borderColor: "black"  }}>Global Chat</Button>
        </Link>,
          <Button  key="1" type="primary"  onClick={Group} style={{ background: "DarkSlateGrey", borderColor: "black"  }}> Create Group </Button>,
          // <Button  key="1" type="danger" onClick={menu}>Logout</Button>,
          <Button
          type="primary"
          icon={<PoweroffOutlined />}
          // loading={loadings[2]}
          onClick={menu}
          style={{ background: "DarkSlateGrey", borderColor: "black"  }}
          
        />
          
        // <div className="space"></div>
          // <Dropdown.Button overlay={menu} >Actions</Dropdown.Button>
        ]}
          
      />
      </div>
    </>
  )
}

export default Headers;