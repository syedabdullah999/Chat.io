import "../chat.scss";
import { to_Decrypt, to_Encrypt } from "../aes.js";
import { process } from "../actions/process";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Headers from "./Headers";
import UsersList from "./UsersList";
import { Footer } from "antd/lib/layout/layout";
import Home from "./Home";
import { MessagesAction } from "../actions/message";
import Loader from "./Loader";
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
// import { useSelector, useDispatch, connect } from 'react-redux';
import { Modal } from 'react-bootstrap'
import { MessagesStoreAction } from "../actions/messageStoreAction";
// import { message } from "antd";

function Chat({ username, roomname, socket }) {
  console.log("hello", username, roomname, socket.id);



  const reduxMessages = useSelector(state => state.AllGlobalMessages.arr)
  console.log("this is few work  _______________________  ", reduxMessages);
  const name = useSelector(state => state.SignIn.token.name)
  const history = useHistory();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false)
  const [typingggg, setTypingggg] = useState("")
  const [uName, setUname] = useState()
  let type = false;
  const [divMove, setDivMove] = useState()
  const [load, setLoad] = useState(true)
  const [chatbox, setChatBox] = useState(false)

  const [reCheck, setRecheck] = useState(false)
  const [show, setShow] = useState(true);
  const handleClose = () => {

    history.push(`/home`)
    setShow(false)
  };
  const handleShow = () => setShow(true);

  useEffect(() => {


    setDivMove(document.getElementById('move'))
    let a = setInterval(() => {
      console.log("Move ==> ", divMove)
      clearInterval(a)
    }, 1000)
    // let m1 = "move"

  }, []);
  /////////////moving the divv /////////////////////
  // useEffect(() => {
  //   if (divMove !== undefined) {
  //     if(chatbox){
  //     console.log("DIV ===> ", divMove);
  //     divMove.addEventListener('mousedown', (event) => {
  //       window.addEventListener('mousemove', move, true);
  //     });
  //     window.addEventListener('mouseup', (event) => {
  //       window.removeEventListener('mousemove', move, true);
  //     });
  //   }}
  // }, [divMove])
  // const move = (e) => {
  //   // let divM = divMove;
  //   let div = document.getElementById('move')
  //   div.style.top = e.clientY + 'px';
  //   div.style.left = e.clientX + 'px';
  //   // setDivMove(divM)
  // };

  const dispatch = useDispatch();

  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher));
  };

  useEffect(() => {
    // setMessages([messages])
    // console.log("messages in redux store   :   ",reduxMessages);
    // console.log("messages in redux store   :   ",reduxMessages.length);
    debugger
    if (reduxMessages.length < 1) {
      console.log("inside get all messages  ************************  ");
      socket.emit("getMessages")

      socket.on("displayMsg", (data) => {
        setLoad(true)
        console.log("message history   :   ", data);
        let d = data.msg
        let len = Object.keys(d).length
        


        for (let i = 0; i < len; i++) {
          const ans = to_Decrypt(d[i].message, d[i].username);
          let temp = messages;
          temp.push({
            userId: socket.id,
            username: d[i].username,
            text: ans,
          });
          
          var arr = temp
          // dispatch(MessagesAction({ name: data.username, text: ans}));
          setLoad(false)
          setChatBox(true)
          setMessages([...temp]);

          // console.log("++++++++++++++++", d[i].username);
        }
        dispatch(MessagesStoreAction(arr));
      })
    }
    else {
      console.log("inside else condition  for message retrieve redux store  :    ", reduxMessages);
      
      setMessages(reduxMessages)
      setLoad(false)
      setChatBox(true)
    }


  }, []);

  const data2 = useSelector(state => state.Messages)
  useEffect(() => {
    debugger;
    var arr2 = []
    console.log("inside useeffect", socket, username, roomname);
    socket.off("message").on("message", (data) => {
      debugger;
      //decypt
      console.log("message response from socket :", data);
      const ans = to_Decrypt(data.text, data.username);
      console.log("inside message socket", data);
      dispatchProcess(false, ans, data.text);
      console.log("inside message socket", ans);
      console.log("length of messages",messages.length);
      let temp =[]
      if(messages.length>0){
      temp = messages;
    }
    else{
      temp = reduxMessages
    }
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      // arr2 = temp
      arr2.length = 0;
      arr2.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      dispatch(MessagesStoreAction(arr2));
      // dispatch(MessagesAction({ name: data.username, text: ans}));

      setMessages([...temp]);
    });
  }, []);
  useEffect(() => {
    socket.on("onlineUsers", (c_user) => {
      console.log("List Of All Online Users  : ", c_user);

    })
    socket.on('display', (data) => {
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
    // e.preventDefault()
    debugger
    console.log("text that is sent  ",text);
    if (text !== "") {
      //encrypt here
      const ans = to_Encrypt(text);
      console.log("message to be sent to socket", ans);
      socket.emit("chat", ans , socket.id);
      setText("");
    }
  };

  const onlineUsers = () => {
    console.log("inside online user socket call");
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
      <Loader load={load} />
      <Home socket={socket} />
      {chatbox == true &&
        <Modal show={show} onHide={handleClose} className="createGroup">
          <div id="move2">
            <div className="chatBoxLeft" id="move" >
              <div className="chat"  >
                <h1 style={{color: "#b7acac"}}>Global Chat Room </h1>
                <div className="user-name">
                  <h2 style={{color: "#b7acac"}}>
                    {username} <span style={{ fontSize: "0.7rem" }}>in {roomname}</span>
                  </h2>
                </div>
                <div className="chat-message">
                  {messages.map((i) => {
                    if (i.username == username) {
                      return (
                        <div className="message">
                          <p>{i.text}</p>
                          <span style={{color: "#b7acac"}}>{i.username}</span>
                        </div>
                      );
                    } else {
                      return (
                        <div className="message mess-right">
                          <p>{i.text} </p>
                          <span style={{color: "#b7acac"}}>{i.username}</span>
                        </div>
                      );
                    }
                  })}
                  <div ref={messagesEndRef} />
                </div>


                <span style={{color: "#b7acac"}}>{uName}{typingggg}</span>
                <div className="send" >
                  <input
                    placeholder="Enter Your Message"
                    value={text}
                    onChange={(e) =>
                      setText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e) {
                        console.log("key is pressed");
                        type = true
                        socket.emit('typing', { user: username, typing: type })
                        setTimeout(() => {
                          console.log('This will run after 1 second!')
                          type = false
                          socket.emit('typing', { user: username, typing: type })
                        }, 4000);
                      } 
                      // if (!e) {
                      //   console.log("not pressing key");
                      //   type = false
                      //   socket.emit('typing', { user: username, typing: type })
                      // }



                      if (e.key === "Enter") {
                        type = false
                        socket.emit('typing', { user: username, typing: type })
                        sendData();
                      }
                    }}
                  ></input>

                  <button onClick={sendData}>Send</button>
                </div>
              </div>

            </div>
          </div>
        </Modal>
      }
    </>
  );
}
export default Chat;
