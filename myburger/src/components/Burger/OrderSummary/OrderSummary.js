import React, { Component } from "react";
import Aux from "../../../hoc/Aux";

import '../../UI/Button/Button.css';
class OrderSummary extends Component {
  componentWillUpdate(){
    console.log('OrderSummaryUpdate');
  }
render(){
  const ingredientSummary = Object.keys(this.props.ingredientuu).map((igKey)  => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
        {this.props.ingredientuu[igKey]}
      </li>
    );
  });
  return(
    <Aux>
    <h3>Your Order</h3>
    <p>A delicious burger with the following ingredients: </p>
    <ul style={{type: 'none'}}>{ingredientSummary}</ul>
<p><strong>Total Price:{this.props.price}</strong></p>
    <p>Continue to checkout??</p>
    
    <button className='Danger' onClick={this.props.purchasedCancelled}>CANCEL</button>
    <button className='Success' onClick={this.props.purchasedContinue}>CONTINUE</button>

  </Aux>

  )
}}; 


export default OrderSummary;
