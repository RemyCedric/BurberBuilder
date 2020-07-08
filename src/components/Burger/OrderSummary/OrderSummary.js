import React, { Component } from 'react'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(name => <li key={name}>{name} : {this.props.ingredients[name]}</li>)
        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}€</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.backdropCancelled} btnType='Danger'>CANCEL</Button>
                <Button clicked={this.props.purchaseContinued} btnType='Success'>CONTINUE</Button>
            </React.Fragment>
        );
    };

};

export default OrderSummary;