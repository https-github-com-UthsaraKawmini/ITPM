import React, { Component } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { getEquipmentByID } from "../../../../services/equipment-services";
import { getCartByUserService, addCartItemService } from "../../../../services/cart-services";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { SweetAlert } from '../../../../services/SweetAlert';

class EquipmentViewMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipment: null,
            cartItems: null,
            quantity: "",
            isInCart: false
        }
    }

    // handle input Change
    handleInputChange = (e) => {
        // check the input is negative
        if(e.target.value !== '' && e.target.value <= 0){
            SweetAlert("error", "Ooopz!", `Quantity can not be negative value!`)
        }
        // if input is a positive one and not greater than available quantity
        else if (this.state.equipment.quantity >= e.target.value) {
            this.setState({
                [e.target.name]: e.target.value
            });
        } else {
            SweetAlert("error", "Ooopz!", `Quantity can not be greater than ${this.state.equipment.quantity}`)
        }
    }

    // Check the item already in the cart 
    checkIsInCart = (cart, equipmentId ) => {
        if (!cart) {
            return false;
        } else {
            let isAvailable = false
            cart.cartItems.map(item => {
                if (item.equipmentID === equipmentId) {
                    isAvailable = true
                }
            })
            return isAvailable;
        }
    }

    // Fetch the equipment details from the server 
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            SweetAlert("error", "Ooopz!", `Please sign in to continue!`)
            this.props.history.push("/SignIn");
        } else {
            getEquipmentByID(this.props.match.params.equipmentId).then(res => {
                if (res.status) {
                    getCartByUserService(user._id).then(response => {
                        if (response.status) {
                            this.setState({
                                equipment: res.equipment,
                                isInCart: this.checkIsInCart(response.cart, res.equipment._id)
                            });
                        }
                    })
                }
            })
        }
    }

    // Function to add item to cart
    addToCart = () => {
        if (this.state.isInCart) {
            this.props.history.push("/cart");
        } else {
            addCartItemService(JSON.parse(localStorage.getItem("user"))._id, {
                equipmentID: this.state.equipment._id,
                name: this.state.equipment.name,
                quantity: this.state.quantity,
                price: this.state.equipment.price,
                imageURL: this.state.equipment.imageURL,
            }).then(res => {
                if (res.status) {
                    SweetAlert("success", "Done!", `Equipment added to cart successfully!`);
                    this.props.history.push("/cart");
                }
            })
        }
    }

    render() {
        return (
            <Container style={{ padding: "30px" }}>
                {
                    this.state.equipment && <Grid container item>
                        <Grid item xs={12} sm={5} container alignItems={"center"} justify={"center"}>
                            <img style={{ maxWidth: "100%" }} width={'400px'} src={this.state.equipment.imageURL} />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Typography variant={'h4'} color={"primary"}>
                                {this.state.equipment.name}
                            </Typography>
                            <Typography variant={'subtitle1'} color={"textSecondary"}>
                                {this.state.equipment.description}
                            </Typography>
                            <Typography variant={'subtitle1'}>
                                Available Quantity
                            </Typography>
                            <Typography variant={'subtitle1'} color={"textSecondary"}>
                                {this.state.equipment.quantity}
                            </Typography>
                            <Typography variant={'h6'} align='right' color='secondary'>
                                RS: {this.state.equipment.price}/-
                            </Typography>
                            {!this.state.isInCart  && <TextField
                                variant="outlined"
                                required
                                label="Enter Quantity"
                                name="quantity"
                                size={"small"}
                                type="number"
                                value={this.state.quantity}
                                onChange={this.handleInputChange}
                            />}
                            <Button
                                disabled={!this.state.quantity && !this.state.isInCart}
                                fullWidth
                                variant="contained"
                                color="primary"
                                size={"large"}
                                startIcon={<AddShoppingCartIcon />}
                                style={{ marginTop: "10px" }}
                                onClick={() => this.addToCart()}
                            >
                                {this.state.isInCart ? "View in cart" : "Add To Cart"}
                            </Button>
                        </Grid>
                    </Grid>
                }
            </Container>
        );
    }
}

export default EquipmentViewMore;
