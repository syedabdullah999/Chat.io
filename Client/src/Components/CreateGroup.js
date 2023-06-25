import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { PageHeader, Button, Descriptions } from 'antd';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Header } from 'antd/lib/layout/layout';
// import { socket } from 'socket.io-client';
import Headers from './Headers';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import io from "socket.io-client";
import axios from 'axios';
import { loginAction } from '../actions'
import Login from './Login';
import ChatComponent from './ChatComponenet';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap'
import { List, Avatar } from 'antd';
import { Input } from 'antd';
import Home from './Home'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBListGroupItem } from 'mdbreact';
import Group from 'rc-image/lib/PreviewGroup';
import UsersList from './UsersList';


function CreateGroup({socket}) {
  const name = useSelector(state => state.SignIn.token.name)
  const history = useHistory();
  const [show, setShow] = useState(true);
  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);
  const token = useSelector(state => state.SignIn.token.token)
  const [users, setUsers] = useState([{}])
  const [members, setMembers] = useState(name.concat(","))
  const [groupName, setGroupName] = useState("")
  const [userUpdate, setUserUpdate] = useState(false)
  const [value, setValue] = useState();
  const [check, setCheck] = useState(false);



  useEffect(() => {
    // for local pc
    // REACT_APP_BaseUrl = 'http://10.0.12.95:4000/users'

    axios.get(process.env.REACT_APP_BaseUrl, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        console.log("Get All Api Response : ", res.data);
        let data = []
        console.log();
        res.data.map((user) => user.userName == name ? delete user.userName : data.push({ title: user.userName }))
        // setUsers(data)
        console.log(data);

        setUsers(data)
      }).catch((e) => {

        console.log("error response", e)

        toast.error('Invalid Username Or Password')
      }
      );


  }, []);


  const create = (value) => {
    console.log("users added to group", value);
    setMembers(...members + "," + value)
  }


  const newGroup = () => {

    let value = {
      groupName: groupName,
      groupMembers: members.slice(0, -1)
    }
    axios.post(process.env.REACT_APP_BaseUrl + '/registergroup', value, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        console.log("new group created : ", res.data);
        handleClose()
        setUserUpdate(true)
        toast.success('Group Successfully Created', {
          position: toast.POSITION.BOTTOM_RIGHT,
        })
        // window.removeEventListener.
        // window.location.reload(false);
        // window.location.reload(false);


      }).catch((e) => {

        console.log("error response", e)
        toast.error('Invalid Group Name')

        // toast.error('Invalid Username Or Password')
      }
      );
    // history.push("/home")
  }

  if(userUpdate){
    setUserUpdate(false)
    return(
      <Home socket={socket}/>
    )
  }

  return (
    <>
      <Headers />
      {/* <div className="createGroup"> */}
      {/* <div className="create-group-modal"> */}
      <Modal show={show} onHide={handleClose} className="createGroup">
        <Modal.Header closeButton className="modal-color">
          <Modal.Title style={{color: "#b7acac"}} >Create Group </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-color">
          <Input
            placeholder="Group Name"
            onChange={(e) =>
              setGroupName(e.target.value)}
          ></Input>
          <span style={{color: "#b7acac"}}>{members}</span>
          {/* <span>-----------</span> */}
          {/* <Modal.Title>Add participants</Modal.Title> */}
          <List  className="userHover"
          style={{color: "#b7acac"}}
            itemLayout="horizontal"
            dataSource={users}
            split={false}
            renderItem={(item, ind) => (
              <List.Item key={ind}>
                <List.Item.Meta
                style={{color: "#b7acac"}}
                  // avatar={<Avatar src="https://img.icons8.com/fluency/48/000000/person-male.png" />}
                  title={<a onClick={() => {
                    // let temp = ""
                    // temp += ","+item.title
                    // if(members)
                    // if(item.title.indexOf("✅") !=0){
                    //   setMembers
                    // }
                    setMembers(members.concat(item.title).concat(","))
                    item.title = null
                    
                    console.log(members);
                  }}

                  style={{color: "#b7acac"}}>{item.title} </a>}


                />
              </List.Item>

            )}
          />


        </Modal.Body>
        <Modal.Footer className="modal-color">
          <Button variant="secondary" onClick={handleClose} style={{ color:"white", background: "#40275a", borderColor: "black"  , borderRadius: "20px"}} >
            Close
          </Button>
          <Button variant="primary" onClick={newGroup} style={{ color:"white", background: "#40275a", borderColor: "black"  , borderRadius: "20px"}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* </div> */}
      
    </>
  );
}

export default CreateGroup


