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
import Calendar2 from './Callender';
import { Layout, Menu, Breadcrumb, Image } from 'antd';
import { bounce } from 'react-animations';
import styled, { keyframes } from 'styled-components';

