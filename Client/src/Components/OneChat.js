import "../chat.scss";
import { to_Decrypt, to_Encrypt } from "../aes.js";
import { process } from "../actions/process";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { oneChatName } from "../actions/oneChatName";
import Headers from "./Headers";
import UsersList from "./UsersList";
import { Footer } from "antd/lib/layout/layout";
import { useSelector, connect } from 'react-redux';
import Home from "./Home";
import { toast } from 'react-toastify';
import { chatName } from "../reducers/chatName";
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import Chat from "./Chat";
toast.configure()


function OneChat({ id, username, socket }) {

  // console.log("iD'SSSSSS: ",currentId,id);
  // const history = useHistory();
  // const initialState = {
  //   userId: "",
  //   username: "",
  //   text: "",
  // }
  // // setText2 = true
  console.log("hello", id, socket.id);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [sendMessages, setSendMessages] = useState([]);
  const [displayMsg, setDisplayMsg] = useState([]);
  const [user, setUser] = useState(false)
  const [myUser, setMyUser] = useState("")
  // const initialState = []


  const [divMove, setDivMove] = useState()

  useEffect(() => {


    setDivMove(document.getElementById('move'))
    let a = setInterval(() => {
      console.log("Move ==> ", divMove)
      clearInterval(a)
    }, 1000)
    // let m1 = "move"

  }, []);

  useEffect(() => {
    if (divMove !== undefined) {
      console.log("DIV ===> ", divMove);
      divMove.addEventListener('mousedown', (event) => {
        window.addEventListener('mousemove', move, true);
      });
      window.addEventListener('mouseup', (event) => {
        window.removeEventListener('mousemove', move, true);
      });
    }
  }, [divMove])
  const move = (e) => {
    // let divM = divMove;
    let div = document.getElementById('move')
    div.style.top = e.clientY + 'px';
    div.style.left = e.clientX + 'px';
    // setDivMove(divM)
  };



  const dispatch = useDispatch();

  const name = useSelector(state => state.chatName.name)
  const currentName = useSelector(state => state.SignIn.token.name)


  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher));
  };

  useEffect(() => {
    if (name == null) {
      console.log("inside store name check if null");
      dispatch(oneChatName(username));

    }


    console.log("inside id checker condition");
    socket.on("sendMsg", (res) => {

      // history.push(`/oneChat/${res.id}/${res.userName}`)
      console.log("send message response  :   ", res);
      console.log("response from one to one chat : ", res.message, res.userName);
      setMyUser(res.userName)

      // if (res.id == socket.id) {


        // if(uName == username){
        const ans = to_Decrypt(res.message, res.userName);
        console.log("inside message socket", ans);
        dispatchProcess(false, ans, res.message);
        console.log("inside message socket", ans);
        let temp = messages;
        temp.push({
          userId: res.id,
          username: res.userName,
          text: ans,
        });
        
        // let data = displayMsg
        // data.push({
        //   userId: id,
        //   username: data.username,
        //   text: ans
        // })
        
        setMessages([...temp])
        // setDisplayMsg([...data])
        // console.log("msgss      :     ",displayMsg);
        // setMessages([...messages],[...displayMsg]);
        // // setMessages([...data])

        console.log("messagesssssss    :    ", messages);
        // toast.success("NEW MESSAGE FROM ", name)
      // }
    });

    console.log("outside ID cheker");
    if (name != username) {
      console.log("setting field values to nulll");

      setText("")
      setMessages([])
      console.log("after null set", messages);

      dispatch(oneChatName(username));
    }


  }, []);
  // useEffect(() => {
  //                 },[]);



  //   console.log("inside useeffect", socket , username,roomname);
  //     socket.on("message", (data) => {
  //       //decypt
  //       console.log("message response from socket :", data);
  //       const ans = to_Decrypt(data.text, data.username);
  //       console.log("inside message socket",data);
  //       dispatchProcess(false, ans, data.text);
  //       console.log("inside message socket",ans);
  //       let temp = messages;
  //       temp.push({
  //         userId: data.userId,
  //         username: data.username,
  //         text: ans,
  //       });
  //       setMessages([...temp]);
  //     });
  //     socket.on("onlineUsers", (c_user) => {
  //         console.log("List Of All Online Users  : ",c_user);
  //     })
  //   }, []);

  const sendData = () => {
    if (text !== "") {

      let temp = sendMessages
      temp.push({
        userId: socket.id,
        username: currentName,
        text: text,
      });
      setSendMessages([...temp])

      setMessages([...temp])
      console.log("initial set setmessages   :   " ,messages);
      console.log("initial set setmessages  2  :   " ,sendMessages);
      //encrypt here

      const ans = to_Encrypt(text);
      let data = []
      data.push({
        sendid: id,
        username: username,
        message: ans
      })
      // setDisplayMsg([...data])
      socket.emit("getMsg", data)
      //   socket.on("sendMsg", (data) => {

      //     console.log("response from one to one chat : ",data);

      // });
      setText("");
      // getMessages()
    }
  };

  //   const onlineUsers = () =>{
  //       console.log("inside online user socket call");
  //   }
  const messagesEndRef = useRef(null);

  //   const scrollToBottom = () => {
  //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   };

  // //   useEffect(scrollToBottom, [messages]);

  //   console.log(messages, "mess");

  return (
    <>
      <Home socket={socket} />
      {/* <Chat
        username={currentName}
        roomname={"Global"}
        socket={socket}
      /> */}
      <div className="chatBoxLeft" id="move">
        <div className="chat">
          <h1>One To One Chat </h1>
          <div className="user-name">
            <h2>
              {currentName}
              {/* <span style={{ fontSize: "0.7rem" }}>in {roomname}</span> */}
            </h2>
          </div>
          <div className="chat-message">
            {messages.map((i) => {
              if (i.username === username) {
                return (
                  <div className="message">
                    <p>{i.text}</p>
                    <span>{currentName}</span>
                  </div>
                );
              } else {
                return (
                  <div className="message mess-right">
                    <p>{i.text} </p>
                    <span>{name}</span>
                  </div>
                );
              }
            })}
            <div ref={messagesEndRef} />
          </div>
          <div className="send">
            <input
              placeholder="enter your message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
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
  );
}


export default OneChat;
