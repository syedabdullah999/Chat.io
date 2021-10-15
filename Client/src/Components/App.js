import { React, useEffect, useState, Component } from 'react';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import Register from './Register';
import Home from './Home'
import Loader from './Loader';
import Login from './Login'
import io from "socket.io-client";
import Chat from './Chat';
import OneChat from './OneChat'
import 'bootstrap/dist/css/bootstrap.min.css';
import GroupChat from './GroupChat';
import { useDispatch, useSelector } from "react-redux";

require('dotenv').config()


const socket = io.connect('/');

function Appmain(props) {
    console.log("in appmain");
    return (
        <>
            <div className="right">
                <Chat
                    username={props.match.params.username}
                    roomname={props.match.params.roomname}
                    socket={socket}
                />
            </div>
            <div className="left">

            </div>
        </>
    );
}

function OneToOneChat(props) {
    console.log("hellooo   :   ", props.match.params.id);
    console.log("helloo   :   ", props.match.params.title);
    return (
        <>
            <OneChat
                id={props.match.params.id}
                username={props.match.params.title}
                // currentId={props.match.params.currentId}
                // textSet2 = {true}
                socket={socket}
            />
        </>
    )
}

function GroupsChat(props) {
    console.log("inside group chat");
    const name = useSelector(state => state.SignIn.token.name)
    let roomname = props.match.params.groupname
    let username = name
    socket.emit("groupChat", { username,roomname });


    return (
        <>
            <GroupChat
                username={name}
                groupname={props.match.params.groupname}
                socket={socket}


            />
        </>
    )

}

function App() {
    return (
        <>
            <main>
                <Switch>
                    {/* <Route path="/" component={Login(socket)} exact /> */}
                    <Route path="/" exact>
                        <Login
                            socket={socket} />
                    </Route>
                    <Route path="/register" component={Register} />
                    <Route path="/home" >
                        <Home socket={socket} />
                    </Route>
                    <Route path="/chat/:roomname/:username" component={Appmain} />
                    <Route path="/oneChat/:id/:title/" component={OneToOneChat} />
                    <Route path="/groupChat/:groupname/" component={GroupsChat} />
                    <Route component={Error} />
                </Switch>
            </main>
        </>
    )
}

export default App;