import React from "react";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Salad", type: "salad" },
];

const buildcontrols = (props) => (
  <div className="BuildControls">
      <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        Add={() => props.ingredientAdded(ctrl.type)}
        Remove={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      /> 
    ))}
    <button className="OrderButton" disabled={!props.purchasable} onClick={props.ordered}>ORDER NOW</button>
  </div>
);

export default buildcontrols;
