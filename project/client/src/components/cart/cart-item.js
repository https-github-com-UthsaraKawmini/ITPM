import React from 'react';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeCartItemService } from "../../services/cart-services";
import { SweetAlert } from '../../services/SweetAlert';

export default function CartItem(props) {
    const cartItem = props.cartItem;

    // remove cart item from the cart
    const removeCartItem = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        removeCartItemService(user._id, cartItem.equipmentID).then(res => {
            if (res.status) {
                SweetAlert("success", "Done!", `Cart item deleted successfully!`)
                props.updateCartItems(user);
            }
        })
    }

    return (
        <Container style={{ padding: "30px" }}>
            <Grid container item component={Paper} elevation={6}>
                <Grid item xs={12} sm={5} container alignItems={"center"} justify={"center"}>
                    <img style={{ maxWidth: "100%" }} width={'400px'} src={cartItem.imageURL} />
                </Grid>
                <Grid item xs={12} sm={7} style={{ padding: 20 }}>
                    <Typography variant={'h4'} color={"primary"}>
                        {cartItem.name}
                    </Typography>
                    <Typography variant={'subtitle1'}>
                        Quantity
                    </Typography>
                    <Typography variant={'subtitle1'} color={"textSecondary"}>
                        {cartItem.quantity}
                    </Typography>
                    <Typography variant={'h6'} align='right' color='secondary'>
                        RS: {cartItem.price * cartItem.quantity}/-
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size={"small"}
                        startIcon={<DeleteIcon />}
                        style={{ marginTop: "10px" }}
                        onClick={() => removeCartItem()}
                    >
                        Remove item
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
