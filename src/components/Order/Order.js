import React from 'react'

import classes from './Order.module.css'

const order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Ingredients:
            {
                    Object.keys(props.ingredients).map(name => {
                        return <span
                            style={{
                                textTransform: 'capitalize',
                                display: 'inline-block',
                                margin: '0 8px',
                                border: '1px solid #ccc',
                                padding: '5px'
                            }}
                            key={name}>{name} ({props.ingredients[name]})</span>
                    })
                }
            </p>
            <p>Price: <strong>{props.price}€</strong></p>
        </div>
    )
}

export default order
