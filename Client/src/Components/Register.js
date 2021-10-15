import {React, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../App.css";
import "./Home"
import { Form, Input, Button, Checkbox, Divider } from "antd";
import axios from "axios";
import Home from "./Home";
import Loader from "./Loader";
import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { toast } from "react-toastify";
toast.configure()



function Register(props) {
  const [showHome, setHome] = useState(false)
  const [Load, setLoader] = useState(true)

  

  const onFinish = (values) => {
    console.log("Success:", values.userName);

    axios.post(process.env.REACT_APP_BaseUrl+'/register', values)
      .then(res => {
        console.log("register api success", res)
        toast("successfull signup")
        
        setHome(true)
        setLoader(true)
        const persons = res.data;
        console.log(persons)
      
    //    let loading = async function loaderf ()   {
        
    //       console.log("loader",Load);
    //         if(Load)
    //         return(
    //           <Loader 
    //           {...setTimeout(() => {}, 1000)}
    //           />
    //         )
    //     }
    // loading()
  }).catch((e) => {
    console.log("eeeeeerror response", e)
    toast("User name or email already taken")
  }
  )
  
}
  if(showHome){
  console.log("home componenet",showHome)
  return (
    <Loader
        {...setTimeout(() => { props.history.push("/") }, 1000)}
      />
    )}
      

  const validatePassword = (rule, value, callback) => {
    // var p = document.getElementById('newPassword').value,
        let errors = [];
    if (value.length < 8 ) {
        errors.push("Your password must be at least 8 characters"); 
    }
    
    if (value.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one letter.");
    }
    if (value.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit."); 
    }
    if (errors.length > 0) {
        // alert(errors.join("\n"));
        callback(errors);

    }
    callback();
}

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:ddddddddddddd", errorInfo);
  };
  return (
    
    <div className="registerForm">
      <strong>
    <h1 className = "heading"> REGISTER</h1></strong>
    <Form
      name="basic"
      labelCol={{
        span: 8
      }}
      wrapperCol={{
        span: 9
      }}
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="userName"
        rules={[
          {
            required: true,
            message: "Please input your username!"
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="userEmail"
        
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          },
          {
            required: true,
            type: "email",
            message: "Please input your Email!"
          }
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="phoneNumber"
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: "Please input your phoneNumber!"
            
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        // type="password"
        // onFinishFailed = {(e) => validatePassword(e.target.value)}
        rules={[
          {
            required: true,
            // type: "password",
            
            message: "Please input your password!"
          },
          
          { validator: validatePassword }
        ]}
        hasFeedback
        
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );

};


export default Register;
