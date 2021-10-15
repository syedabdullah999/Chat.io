import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { Spin } from 'antd';

const Loader = () => {

    return (
        
  <div className="load">
    <Spin
    
    size = "large" />
  </div>
)
};

export default Loader; 