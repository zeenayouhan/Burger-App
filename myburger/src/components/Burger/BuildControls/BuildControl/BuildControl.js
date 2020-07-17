import React from 'react';
import './BuildControl.css';

const buildControl = (props)=>(
    <div className="BuildControl">
        <div className="Label">{props.label}</div>
        <button className="More" onClick={props.Add} >More</button>
        <button className="Less" onClick={props.Remove} disabled={props.disabled}>Less</button>
    </div>
);

export default buildControl;