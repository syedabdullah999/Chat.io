import "../chat.scss";
import { to_Decrypt, to_Encrypt } from "../aes.js";
import { process } from "../actions/process";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Headers from "./Headers";
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import UsersList from "./UsersList";
import { Footer } from "antd/lib/layout/layout";
import Home from "./Home";
import CloseButton from 'react-bootstrap/Button';
import _ from "lodash";
import '../index.css';
import { Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from "./Loader";

function GroupChat({ username, groupname, socket }) {

    const name = useSelector(state => state.SignIn.token.name)
    console.log("inside group chat again    ", groupname , username);
    const history = useHistory();
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false)
    const [typingggg, setTypingggg] = useState("")
    const [uName, setUname] = useState()
    const [group, setGroup] = useState()
    const [load, setLoad] = useState(true)
    const [chatbox, setChatBox] = useState(false)
    const [reCheck, setRecheck] = useState(false)
    const [show, setShow] = useState(true);
    const handleClose = () => {
        history.push(`/home`)
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const [sr, setSR] = useState(false)
    let type = false;
    var sr2 = false;


    const dispatch = useDispatch();

    const dispatchProcess = (encrypt, msg, cipher) => {
        dispatch(process(encrypt, msg, cipher));
    };
    // useEffect(() => {
    //     console.log("inside use effect");
    //     // debugger
    //     let grp2 = JSON.parse(localStorage.getItem('groupChange'));
    //     if (group == null || group == undefined || group == "") {
    //         console.log("inside group null check    ");
    //         // localStorage.setItem('groupChange', JSON.stringify(groupname));
    //         // localStorage.setItem('groupChangeCondition', JSON.stringify(true));


    //         setGroup(groupname)
    //     }
    //     let grp = JSON.parse(localStorage.getItem('groupChange'));
    //     console.log("group saved in usestate   :   ", group);
    //     if (group !== groupname) {
    //         console.log("setting fields to null  ");
    //         setUname()


    //         // let temp = []
    //         // temp.push({
    //         //     userId: null,
    //         //     username: null,
    //         //     text: null,
    //         // });
    //         // setMessages(u =>[...u, null])
    //         // setMessages(messages.filter(item => item.username === null))
    //         // setRecheck(true)
    //         // messages = null
    //         let messages2 = []
    //         setMessages([])
    //         console.log("B");
    //         setRecheck(false)
    //         setSR(true)
    //         // setSR(true)
    //         setText("")
    //         // setTimeout(() => {

    //         // }, 3000); 
    //         console.log("reseting values to null    ", messages);
    //         console.log("group name  =  ", groupname);
    //         // let a = setInterval(() => {
    //         //     clearInterval(a)
    //         // }, 1000)
    //     }

    // }, [groupname]);

    useEffect(() => {
        socket.emit("getGroupMessages", groupname);
        socket.on("displayGroupMessage", (data) => {

            setLoad(true)

            console.log("response from data", data.msg);
            if (data.msg != undefined) {
                let d = data.msg
                let len = Object.keys(d).length
                console.log("message history   :   ", data);

                for (let i = 0; i < len; i++) {
                    const ans = to_Decrypt(d[i].message, d[i].username);
                    let temp = messages;
                    temp.push({
                        userId: socket.id,
                        username: d[i].username,
                        text: ans,
                    });
                    setMessages([...temp]);

                    // dispatch(MessagesAction({ name: data.username, text: ans}));

                    // console.log("++++++++++++++++", d[i].username);
                }
            }
        })
        setLoad(false)
        setChatBox(true)


    }, []);


    // useEffect(() => {

    //     console.log("use effect updation on messages hook  :  ", messages);
    //     let temp = []

    //     // setMessages([])
    //     // if(messages.length < 1){
    //     //     setSR(true)
    //     // }
    // }, [messages]);
    useEffect(() => {
        // setMessages([])
        // setMessages([""])
        // let u_Name = ""\

        console.log("inside useeffect", socket, username, groupname);
        socket.on("groupMsg", (data) => {
            console.log("A");
            setGroup(data.room)
            if (data.room == groupname) {
                //decypt
                // console.log("message response from socket :", data);
                console.log("socket message data   :   ", data.text);
                const ans = to_Decrypt(data.text, username);
                // console.log("inside message socket", data);
                dispatchProcess(false, ans, data.text);
                console.log("RUNNINNG       :    ", messages);

                let temp = messages

                // if(sr){
                //     let msg = 
                //     temp = null
                // }
                // debugger
                // let temp = group == groupname ? _.cloneDeep(messages) : [];


                temp.push({
                    userId: data.userId,
                    username: data.username,
                    text: ans,
                });
                setMessages([...temp]);
                setRecheck(true)
                // let a = setInterval(() => {
                //     clearInterval(a)
                // }, 1000)
                console.log(" this is ittt   :   ", messages);
            }
            // temp = null
        });
        socket.on("onlineUsers", (c_user) => {
            console.log("List Of All Online Users  : ", c_user);

        })
        socket.on('displayy', (data) => {
            if (data.typing == true && data.user != name) {
                setTyping(true)
                console.log("user typing is  :  ", data.user);
                setUname(data.user)
                setTypingggg(" is typing...")
            }
            else {
                setTyping(false)
                setUname("")
                setTypingggg("")
            }
        });
    }, []);

    const sendData = () => {

        if (text !== "") {
            //encrypt here
            const ans = to_Encrypt(text);
            socket.emit("groupChatMessage", ans, groupname);
            setText("");
        }
    };

    const onlineUsers = () => {
        console.log("inside online user socket call");
    }

    const closeTab = () => {
        history.push(`/home`)
    }
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (chatbox) {
            messagesEndRef.current.scrollIntoView({ block: "end" });
        }
    };

    useEffect(scrollToBottom, [messages]);

    console.log(messages, "mess");


    return (
        <>
            {/* <div className="Home">

                <Headers socket={socket} />
            </div> */}
            <Loader load={load} />
            <Home socket={socket} />
            {chatbox == true &&
                <Modal show={show} onHide={handleClose} className="createGroup">

                    <div className="chatBoxLeft" id="move">
                        {/* <CloseButton onClick={closeTab} /> */}
                        <div className="chat">
                            <h1 style={{color: "#b7acac"}}>{groupname}</h1>
                            <div className="user-name">
                                <h2 style={{color: "#b7acac"}}>
                                    {username} <span style={{ fontSize: "0.7rem" }}>in {groupname}</span>
                                </h2>
                            </div>
                            <div className="chat-message">
                                {messages.map((i, ind) => {
                                    if (i.username !== username) {
                                        return (
                                            <div className="message" key={ind}>
                                                <p>{i.text}</p>
                                                <span style={{color: "#b7acac"}}>{i.username}</span>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div className="message mess-right" key={ind}>
                                                <p>{i.text} </p>
                                                <span style={{color: "#b7acac"}}>{i.username}</span>
                                            </div>
                                        );
                                    }
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            <span style={{color: "#b7acac"}}>{uName}{typingggg}</span>

                            <div className="send">

                                <input
                                    placeholder="enter your message"
                                    value={text}
                                    onChange={(e) =>
                                        setText(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e) {
                                            console.log("key is pressed");
                                            type = true
                                            socket.emit('typingg', { user: username, typing: type })
                                            setTimeout(() => {
                                                console.log('This will run after 1 second!')
                                                type = false
                                                socket.emit('typingg', { user: username, typing: type })
                                            }, 4000);

                                        } if (!e) {
                                            console.log("not pressing key");
                                            type = false
                                            socket.emit('typingg', { user: username, typing: type })
                                        }



                                        if (e.key === "Enter") {
                                            type = false
                                            socket.emit('typingg', { user: username, typing: type })
                                            sendData();
                                        }
                                    }}
                                ></input>

                                <button onClick={sendData}>Send</button>
                            </div>
                        </div>
                        {/* <button onClick={onlineUsers}>Send</button> */}
                    </div>
                </Modal>
            }
        </>
    )
}

export default GroupChat;
