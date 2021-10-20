import "../chat.scss";
import { to_Decrypt, to_Encrypt } from "../aes.js";
import { process } from "../actions/process";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Headers from "./Headers";
import UsersList from "./UsersList";
import { Footer } from "antd/lib/layout/layout";
import Home from "./Home";

function GroupChat({ username, groupname, socket }) {

    const name = useSelector(state => state.SignIn.token.name)

    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false)
    const [typingggg, setTypingggg] = useState("")
    const [uName, setUname] = useState()
    let type = false;

    const dispatch = useDispatch();

    const dispatchProcess = (encrypt, msg, cipher) => {
        dispatch(process(encrypt, msg, cipher));
    };

    useEffect(() => {
        console.log("inside useeffect", socket, username, groupname);
        socket.on("groupMsg", (data) => {
            //decypt
            // console.log("message response from socket :", data);
            const ans = to_Decrypt(data.text, username);
            // console.log("inside message socket", data);
            // dispatchProcess(false, ans, data.text);
            // console.log("inside message socket", ans);
            let temp = messages;
            temp.push({
                userId: data.userId,
                username: data.username,
                text: ans,
            });
            setMessages([...temp]);
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
            socket.emit("groupChatMessage", ans);
            setText("");
        }
    };

    const onlineUsers = () => {
        console.log("inside online user socket call");
    }
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    //   useEffect(scrollToBottom, [messages]);

    console.log(messages, "mess");

    return (
        <>
            <Home socket={socket} />
            <div className="chatBoxLeft">
                <div className="chat">
                    <h1>{groupname}</h1>
                    <div className="user-name">
                        <h2>
                            {username} <span style={{ fontSize: "0.7rem" }}>in {groupname}</span>
                        </h2>
                    </div>
                    <div className="chat-message">
                        {messages.map((i) => {
                            if (i.username === username) {
                                return (
                                    <div className="message">
                                        <p>{i.text}</p>
                                        <span>{i.username}</span>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="message mess-right">
                                        <p>{i.text} </p>
                                        <span>{i.username}</span>
                                    </div>
                                );
                            }
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    <span>{uName}{typingggg}</span>

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
        </>
    )
}

export default GroupChat;