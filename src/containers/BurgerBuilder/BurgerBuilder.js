import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders'

import * as actionType from '../../store/actions'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'



class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                let ingredients = response.data
                // let initialPrice = Object.keys(ingredients).reduce((p, c) => {
                //     return p + INGREDIENT_PRICES[c] * ingredients[c]
                // }, this.state.totalPrice);
                this.setState({
                    ingredients: ingredients
                    // totalPrice: initialPrice
                })
            }).catch(error => {
                this.setState({ error: true })
            })
    }

    updatePurchaseState() {
        const sum = Object.keys(this.props.ings)
            .map(ingredient => this.props.ings[ingredient])
            .reduce((a, c) => a + c);
        return sum > 0 ? true : false
    }

    purchaseHandler = () => this.setState({ purchasing: true })
    purchaseCancelHandler = () => this.setState({ purchasing: false })
    purchasecontinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0 ? true : false;
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        let orderSummary = null;
        if (this.props.ings) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        price={this.props.price}
                        ingredients={this.props.ings}
                        disabledInfo={disabledInfo}
                        purchasable={this.updatePurchaseState()}
                        addClick={this.props.onIngredientAdded}
                        removeClick={this.props.onIngredientRemoved}
                        orderNowClick={this.purchaseHandler}
                    />
                </React.Fragment>);
            orderSummary = (
                <OrderSummary
                    price={this.props.price}
                    ingredients={this.props.ings}
                    backdropCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchasecontinueHandler}
                />)
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <React.Fragment>
                {this.state.purchasing ?
                    <Modal show={this.state.purchasing} backdropCancelled={this.purchaseCancelHandler}>
                        {orderSummary}
                    </Modal> : null
                }
                {burger}
            </React.Fragment>);
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionType.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));