import React, { Component } from 'react';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { getCartByUserService, buyCartItemService } from "../../services/cart-services"
import { SweetAlert } from '../../services/SweetAlert';
import CartItem from './cart-item';
import { withRouter } from "react-router-dom";


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: null,
            total: 0
        }
    }

    // function to get cart items total
    getTotal = (cartItems) => {
        let total = 0;
        cartItems && cartItems.map(item => {
            total += item.price * item.quantity;
        })

        return total;
    }

    // Fetch cart items and set the total price
    updateCartItems = (user) => {
        getCartByUserService(user._id).then(res => {
            if (res.status) {
                this.setState({
                    cart: res.cart,
                    total: this.getTotal(res.cart.cartItems)
                });
            }
        })
    }

    // initial call to server for get cart items 
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            SweetAlert("error", "Ooopz!", `Please sign in to continue!`)
            this.props.history.push("/SignIn");
        } else {
            this.updateCartItems(user);
        }
    }

    // Buy the cart items
    buyNow = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        buyCartItemService(user._id).then(res => {
            if (res.status) {
                SweetAlert("success", "Done!", `Cart checkout successfully!`);
                this.updateCartItems(user)
            }
        })
    }

    render() {
        return (
            <Container style={{ marginBottom: 50, marginTop: 50 }}>
                {
                    this.state.cart && this.state.cart.cartItems.length > 0 ? <Grid container spacing={5}>
                        <Grid sm={12}>
                            <Typography variant='h5' color='primary' align='center'>Shopping Cart</Typography>
                        </Grid>
                        <Grid item sm={12} md={8} >
                            {
                                this.state.cart.cartItems.map(item => <CartItem updateCartItems={this.updateCartItems} cartItem={item} />)
                            }
                        </Grid>
                        <Grid item sm={12} md={4} component={Paper} elevation={6} style={{ height: 250 }}>
                            <Typography variant='h4' color='primary' align='left'>Total</Typography>
                            <Typography variant='h5' color='secondary' align='right'>RS: {this.state.total}/-</Typography>
                            <Button
                                onClick={this.buyNow}
                                style={{ marginTop: 20, marginBottom: 10 }}
                                size={"large"}
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Buy Now
                            </Button>
                            <Typography variant='subtitle1' color='inherit' align='left'>*Delivery Address</Typography>
                            <Typography variant='subtitle2' color='textSecondary' align='left'>{JSON.parse(localStorage.getItem("user")).address}</Typography>
                        </Grid>
                    </Grid>
                        : <Grid>
                            <Typography variant='h5' color='primary' align='center'>Your shopping cart is empty. Keep shopping!</Typography>
                        </Grid>
                }

            </Container>
        );
    }
}

export default withRouter(Cart);
