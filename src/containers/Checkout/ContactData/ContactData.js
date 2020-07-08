import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import classes from './ContactData.module.css'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false

            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP Code"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false

            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false

            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: "email",
                    placeholder: "Your E-Mail"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false

            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'cheapest' }
                    ]
                },
                value: 'fastest'
            }
        },
        loading: false
    };
    onChangeHandler = (event, name) => {
        const newState = { ...this.state.orderForm };
        const updatedFormelement = { ...newState[name] }
        updatedFormelement.value = event.target.value;
        updatedFormelement.valid = this.checkValidity(updatedFormelement.value, updatedFormelement.validation);
        updatedFormelement.touched = true;
        newState[name] = updatedFormelement;
        this.setState({ orderForm: newState })
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        const extractedData = {};
        for (let formelementIdentifier in this.state.orderForm) {
            extractedData[formelementIdentifier] = this.state.orderForm[formelementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: parseFloat(this.props.price).toFixed(2),
            orderData: extractedData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                })
                this.props.history.push('/')
            })
            .catch(_ => {
                this.setState({
                    loading: false,
                })
            })
    }


    checkValidity(value, rules) {
        let isValid = true;

        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid;
            }
        }
        return isValid;
    }

    formValidated() {
        for (let name in this.state.orderForm) {
            if (this.state.orderForm[name].validation && !this.state.orderForm[name].valid)
                return true;
        }
        return false;
    }

    render() {
        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    Object.keys(this.state.orderForm).map(n => {
                        return <Input
                            key={n}
                            elementType={this.state.orderForm[n].elementType}
                            elementConfig={this.state.orderForm[n].elementConfig}
                            value={this.state.orderForm[n].value}
                            invalid={!this.state.orderForm[n].valid}
                            shouldValidate={this.state.orderForm[n].validation}
                            touched={this.state.orderForm[n].touched}
                            changed={event => this.onChangeHandler(event, n)}
                        />
                    })
                }
                <Button disabled={this.formValidated()} btnType="Success">ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData)
