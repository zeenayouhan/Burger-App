import React from 'react';
import Burger from '../../Burger/Burger';
import './CheckoutSummary.css';

const checkoutSummary=(props)=>{
    return(
        <div className='Checkout'>
            <h1>We hoper it tasted well</h1>
            <div style={{width:'100%',height:'300px',margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
            </div>
            <button >Cancel</button>
            <button >Continue</button>
        </div>
    )

}
export default checkoutSummary;