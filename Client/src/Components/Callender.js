import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { Calendar } from 'antd';

function Calender2() {

function onPanelChange(value, mode) {
  console.log(value, mode);
}
return(
<>
  <div className="site-calendar-demo-card">
    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
  </div>,
  {/* document.getElementById('container'), */}
  </>
);
}
export default Calender2