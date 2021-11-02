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
import { to_Decrypt, to_Encrypt } from "../aes.js";
import GroupChat from './GroupChat';
import { useDispatch, useSelector } from "react-redux";
import '../index.css';
// import background from "../chat-bubbles.png";
import BackgroundImage from "./backgroundImage";
import Image from 'react-bootstrap/Image';
import { toast } from 'react-toastify';
import chatBubbles from '../Dark5.jpg'
import { Button, notification } from 'antd';

import 'antd/dist/antd.css';
// import { POSITION } from 'react-toastify/dist/utils';

require('dotenv').config()


const socket = io.connect('/');

function Appmain(props) {
    console.log("in appmain");
    return (
        <>
            <div >
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
    const name = useSelector(state => state.SignIn.token.name)
    console.log("inside group chat ##########################################  !!!!!!!!!!!!!!!!!!! ", name, props.match.params.groupname);
    let roomname = props.match.params.groupname
    let username = name
    socket.emit("groupChat", { username, roomname });


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

toast.configure()
function App() {
    // const [notification, setNotification] = useState(false)
    useEffect(() => {
        socket.on("notification", (data) => {
            
            let n = data.user2
            console.log("message recieved ((((((((((())))))))))))))", data);
            const ans = to_Decrypt(data.message, data.userName);
            const args = {
                message: 'Message From '+n,
                description:
                ans,
                duration: 4,
            };
            notification.config({
                placement: 'bottomRight',
                bottom: 50,
                duration: 4,
                // rtl: true,
                
              });
            
            notification.open(args);
            // toast.success('Successfull Login',data.userName ,{
            //     position: toast.POSITION.BOTTOM_CENTER})
        })
    }, []);

    // if(notification){
    //     return(
    //         <>

    //         </>
    //     )
    // }
    return (
        <>

            <Image src={chatBubbles} className="image-set2" />
            <main>
                <Switch>
                    {/* <Route path="/" component={Login(socket)} exact /> */}
                    <Route path="/" exact>
                        <Login
                            socket={socket} />
                    </Route>
                    <Route path="/register" component={Register} />
                    <Route path="/home" >
                        {/* <BackgroundImage /> */}
                        <Home socket={socket} />
                    </Route>
                    <Route path="/chat/:roomname/:username" component={Appmain} />
                    <Route path="/oneChat/:id/:title/" component={OneToOneChat} />
                    <Route path="/groupChat/:groupname/" component={GroupsChat} />
                    <Route component={Error} />
                </Switch>
            </main>

            {/* </div> */}
        </>
    )
}

export default App;