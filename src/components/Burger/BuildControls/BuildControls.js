import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'

// const controls = [
//     { label: 'Salad', type: 'salad' },
//     { label: 'Bacon', type: 'bacon' },
//     { label: 'Cheese', type: 'cheese' },
//     { label: 'Meat', type: 'meat' }
// ];


const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)} €</strong></p>
        {Object.keys(props.ingredients).map(name => (
            <BuildControl
                key={name.charAt(0).toUpperCase() + name.slice(1)}
                label={name.charAt(0).toUpperCase() + name.slice(1)}
                disabled={props.disabledInfo[name]}
                added={() => props.addClick(name)}
                removed={() => props.removeClick(name)}
            />
        ))}
        <button
            className={classes.OrderButton}
            onClick={props.orderNowClick}
            disabled={!props.purchasable}>ORDER NOW</button>
    </div>);

export default buildControls;

