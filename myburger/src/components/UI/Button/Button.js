import React from 'react';
import './Button.css';

const button =(props)=>(
    <div>
        <button  className={["Button","Success"].join('')} onClick={props.clicked}>{props.children}</button>
    <button  className={["Button","Danger"].join('')} onClick={props.clicked}>{props.children}</button>

    </div>
   
);

export default button;
  