import { React, useEffect, useState } from "react";
import '../index.css';
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
// import '../index.css';
import { List, Avatar } from 'antd';
import Headers from "./Headers";
// import { Layout, Menu, Breadcrumb,Image } from 'antd';
import Chat from "./Chat";
import Loader from "./Loader";
import BackGround from "./Background";
import UsersList from "./UsersList";
import Image from 'react-bootstrap/Image';
import chatBubbles from '../chat-bubbles.png'




function BackgroundImage (){

return(
    <>
    <div className="image-set">

    {/* <Image src={chatBubbles} fluid/> */}
    </div>
    </>
)
}
export default BackgroundImage
