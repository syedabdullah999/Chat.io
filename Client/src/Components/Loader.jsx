// import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { Spin } from 'antd';
import { Modal } from 'react-bootstrap'
import React, { useState, useEffect, useRef } from "react";

const Loader = () => {
  const [show, setShow] = useState(true);
    return (
        
  <div className="load">
    {/* <Modal show={show}  className="createGroup"> */}
    <Spin
    // style={{ color: "#b7acac !important" }}
    size = "large" />
    {/* </Modal> */}
  </div>
)
};

export default Loader; 