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
import { Link } from 'react-router-dom';


function GroupList() {


    return (
        <>

            <div className="userList">
                <h1> User List </h1>
                <List
                    itemLayout="horizontal"
                    dataSource={users}
                    renderItem={(item, ind) => (
                        <List.Item key={ind}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://img.icons8.com/fluency/48/000000/person-male.png" />}
                                title={<a onClick={chatBoxes}

                                >{item.title}</a>}

                            />
                        </List.Item>

                    )}
                />

            </div>

        </>
    )

}
export default GroupList
