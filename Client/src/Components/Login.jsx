import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Register from './Register';
import Home from './Home'
import Loader from './Loader';
import { Link } from "react-router-dom";
import App from './App'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch, connect } from 'react-redux';
import { loginAction } from '../actions'
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';

toast.configure()





const Login = ({ props, socket }) => {

  // let socket = socket
  const history = useHistory();



  const name = useSelector(state => state.SignIn.token.name)

  const [register, setRegister] = useState(false)
  const [Load, setLoader] = useState(false)
  const [Load2, setLoader2] = useState(false)
  const [showHome, setHome] = useState(false)
  const dispatch = useDispatch();

  ////TO VIEW MY REDUX STORE ITEM
  const signin = useSelector(state => state.SignIn.token)
  // console.log("store item", signin);

  //// to modify item in redux store


  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('user'));
    console.log("local storage dataa   ", user);
    if (user != null) {
      console.log("inside local storage checking");
      dispatch(loginAction({ token: user.token, name: user.name, socketId: user.socketId }));
      let username = user.name;
      let roomname = "Global"
      console.log(roomname);
      console.log(username);
      if (username != "" && roomname != "") {
        console.log("B");
        // setsocketCon(socket)
        console.log("socket id for current user : ", socket.id);
        socket.emit("joinRoom", { username, roomname });
        console.log("c");
      } else {
        alert("username and roomname are must !");
        // window.location.reload();
      }


      
        history.push("/home")





    }
  }, []);






  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    axios.post(process.env.REACT_APP_BaseUrl + '/authenticate', values)
      .then(res => {
        console.log("login successful");
        setHome(true)

        setLoader(true)

        // console.log(val);

        // var user = JSON.parse(localStorage.getItem('user'));
        // console.log("local storage dataa   ",user);
        // if(user != null){
        //   console.log("inside local storage checking");
        //   dispatch(loginAction({token: user.token, name: user.name, socketId: user.socketId}));
        //   history.push("/home")
        // }
        dispatch(loginAction({ token: res.data.token, name: res.data.userName, socketId: socket.id }));

        /////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////


        let obj = {
          token: res.data.token,
          name: res.data.userName,
          socketId: socket.id
        }
        localStorage.setItem('user', JSON.stringify(obj));

        console.log("A");
        // setRoomName("Global")
        // setUserName(name)
        let username = values.userName;
        let roomname = "Global"
        console.log(roomname);
        console.log(username);
        if (username != "" && roomname != "") {
          console.log("B");
          // setsocketCon(socket)
          console.log("socket id for current user : ", socket.id);
          socket.emit("joinRoom", { username, roomname });
          console.log("c");
        } else {
          alert("username and roomname are must !");
          // window.location.reload();
        }

        console.log(roomname);


        ///////////////////////////////////////////////
        ////////////////////////////////////////////////
        console.log("login api success", res)
        const login = res.data.token
        console.log(login);
        // setHome(false)

        toast.success('Successfull Login', {
          position: toast.POSITION.BOTTOM_RIGHT})


      }).catch((e) => {

        console.log("error response", e)

        toast.error('Invalid Username Or Password')
      }
      )
  };
  if (Load) {
    // console.log("home componenet",showHome)
    return (
      <Loader
        {...setTimeout(() => {
          setLoader(false)
          setHome(false)
          history.push("/home")

        }, 1000)}
      />

    )
  }
  if (showHome) {
    ///to rendet register page componenet with changing route
  }

  const OnClickRegister = () => {
    setRegister(true)
    setLoader2(true)
    console.log("on register click")

  };
  if (Load2) {
    return (
      <>
        <Loader
          {...setTimeout(() => {
            setLoader2(false)

          }, 1000)}
        />
      </>

    )
  }
  // const time = setTimeout(console.log("waiting") ,3000)
  if (register) {
    ///to rendet register page componenet with changing route
    history.push("/register")
  }

  return (
    <>
      <div className="BackgroundColour">
        <div className="loginForm">

          <strong>
            <h1 className="heading1"> LOGIN</h1></strong>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a onClick={() => OnClickRegister()} >register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div></>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     name: state.name
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: (token, name) => { dispatch(loginAction(token, name)) }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;