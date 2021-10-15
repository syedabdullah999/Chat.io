import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import '../Background.css'
import { PageHeader,Button, Descriptions } from 'antd';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Header } from 'antd/lib/layout/layout';

function BackGround () {


    return (
        <div class="bg-text" data-bg-text="text">
        
    </div>  
    )
}

export default BackGround