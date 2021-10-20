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
import { Link, useHistory } from 'react-router-dom';





function UsersList({ socket }) {

    const history = useHistory();
    const name = useSelector(state => state.SignIn.token.name)
    const token = useSelector(state => state.SignIn.token.token)
    const [box, setBox] = useState(false)
    // console.log("store item", token);
    const [userGroups, setUserGroups] = useState([{}])



    const [users, setUsers] = useState([{}])
    const [onlineUsers, setOnlineUsers] = useState([{}])
    // useEffect(() => {

    //     let online = []
    //     socket.emit("getonlineusers", {});
    //     socket.on("onlineUsers", (c_user) => {

    //         if (c_user == null) {
    //             console.log("empty online users");
    //         }
    //         else {
    //             c_user.c_user.map((user) => online.push({ title: user.username, id: user.id }))
    //             console.log("List Of All Online Users  : ", online);
    //             let online2 = online.filter((i) => i.title != name)
    //             console.log(online2);
    //             setOnlineUsers(online2)
    //         }
    //         // history.push('/home')
    //     })
    // }, []);
    useEffect(() => {
        axios.get(process.env.REACT_APP_BaseUrl, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                console.log("Get All Api Response : ", res.data);
                let data = []
                console.log();
                res.data.map((user) => data.push({ title: user.userName }))
                // setUsers(data)
                console.log(data);
                setUsers(data)
            }).catch((e) => {

                console.log("error response", e)

                toast.error('Invalid Username Or Password')
            }
            );
        let a = setInterval(() => {
            let online = []
            socket.emit("getonlineusers", {});
            socket.on("onlineUsers", (c_user) => {

                if (c_user == null) {
                    console.log("empty online users");
                }
                else {
                    c_user.c_user.map((user) => online.push({ title: user.username, id: user.id }))
                    console.log("List Of All Online Users  : ", online);
                    let online2 = online.filter((i) => i.title != name)
                    console.log(online2);
                    setOnlineUsers(online2)
                }
                // history.push('/home')
            })
            clearInterval(a)
        }, 100)

    }, []);

    useEffect(() => {

        axios.get(process.env.REACT_APP_BaseUrl + '/group/' + name, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                console.log("Get User Groups DATA      : ", res.data);
                let data = []
                console.log("user group name    :   ", res.data.length);
                let g = res.data
                // debugger;
                let len = Object.keys(res.data).length
                for (let i = 0; i < len; i++) {
                    console.log("inside loop");
                    data.push({ title: g[i].groupName })
                }
                // for ( let g in res.data){
                //     console.log("inside loop   :  " ,g);
                //     data.push({ title: g.groupName })
                // }
                // g.forEach(element => { 
                //     console.log("for each" , element);

                // });
                // res.map((group) => data.push({ title: group.groupName }))
                // res.map((group) => console.log("Group name is :",group.groupName))
                // // setUsers(data)
                // console.log(data);
                // setUsers(data)
                console.log("user groups final  :   ", data);
                setUserGroups(data)
            }).catch((e) => {

                console.log("error response", e)

                // toast.error('Invalid Username Or Password')
            }
            );


    }, []);
    // useEffect(() => {
    // }, []);

    const chatBoxes = () => {
        console.log("inside chat box")
        setBox(true)
    }

    const OneChatBox = (id, title) => {
        console.log("inside oneChatBox : ", id, title);
        return (
            <Link to={`/oneChat/${id}/${title}`} />
        )
    }


    return (
        <>
            <div className="userList">
                <h1> User List </h1>
                
                <List className="userHover"
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
               

                <div className="gap"></div>
                
                <h1>Groups</h1>
                <List className="userHover"
                    itemLayout="horizontal"
                    dataSource={userGroups}
                    renderItem={(item, ind) => (
                        <List.Item key={ind}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://img.icons8.com/ios-filled/50/000000/group-foreground-selected.png" />}
                                title={onclick = <Link to={`/groupChat/${item.title}`}>{item.title}</Link>}

                            />
                        </List.Item>

                    )}
                />

            </div>
            <div className="onlineUsers">
                <List
                    header="Online"
                    itemLayout="horizontal"
                    dataSource={onlineUsers}
                    renderItem={(item, ind) => (
                        <List.Item key={ind}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://img.icons8.com/fluency/48/000000/person-male.png" />}
                                // {...item.title != name}
                                title={onclick = <Link to={`/oneChat/${item.id}/${item.title}`}>{item.title}</Link>}
                            // <a 
                            //     // href={[<Link to={`/oneChat/${item.id}/${item.title}`}/>]}

                            // >{item.title}</a>
                            //  onClick ={<Link to={`/oneChat/${item.id}/${item.title}`}/>}

                            />

                        </List.Item>

                    )}
                />
            </div>
        </>

    )

}

export default UsersList