import React, { Component } from 'react';
import moment from 'moment';
import { Avatar, Backdrop, Button, Card, CircularProgress, Container, Divider, Grid, Typography } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { green } from '@material-ui/core/colors';
import Swal from "sweetalert2";
import { deleteCustomerService } from '../../../services/CustomerServices';
import UpdateCustomer from '../update-customer/UpdateCustomer';

const styles = (theme) => ({
    container: {
        marginTop: 40
    },
    large: {
        width: theme.spacing(30),
        height: theme.spacing(30),
        marginTop: 10,
        [theme.breakpoints.up('md')]: {
            width: theme.spacing(45),
            height: theme.spacing(45),
            marginTop: 40,
        },
    },
    detailsCardStyle: {
        padding: 40,
        marginBottom: 50
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    update: {
        marginRight: 20,
        background: green[700],
        color: "#ffffff",
        '&:hover': {
            background: green[800],
        },
    }
});

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            mobile: "",
            gender: "",
            birthDate: null,
            image: null,
            isImageChanged: false,
            isShow: true
        }
    }

    updateProfileDetails = () => {
        let customer = JSON.parse(localStorage.getItem("customer"));
        if (!customer) {
            this.props.history.push("/SignIn");
        } else {
            this.setState({
                isShow: false,
                id: customer.id,
                name: customer.name,
                email: customer.email,
                mobile: customer.mobile,
                gender: customer.gender,
                birthDate: customer.birthDate,
                image: {
                    preview: customer.imageURL,
                    raw: null
                }
            });
        }

    }

    componentDidMount() {
        this.updateProfileDetails()
    }

    // Finctions to close the account
    closeAccount = () => {
        Swal.fire({
            title: 'Confirmation',
            text: "Are you want to delete this account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Delete'
        }).then((result) => {

            if (result.isConfirmed) {
                deleteCustomerService(this.state.id).then(res => {
                    if (res.status) {
                        this.props.history.push("/SignIn");
                    }
                })
            }
        })

    }

    updateCustomerDialogRef = React.createRef();


    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <UpdateCustomer ref={this.updateCustomerDialogRef} updateProfileDetails={this.updateProfileDetails} />
                <Container className={classes.container}>
                    {
                        (this.state.isShow)
                            ? <Backdrop className={classes.backdrop} open={this.state.isShow}>
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            :
                            <Card elevation={4} className={classes.detailsCardStyle}>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={5}>
                                        <Grid container justify={"center"} alignItems={"center"}>
                                            <Avatar src={this.state.image.preview} className={classes.large} />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={7}>

                                        <Typography gutterBottom variant={"h4"} color={'textSecondary'}>My Profile</Typography>

                                        <Divider style={{ marginBottom: 20 }} />

                                        <Typography color={"inherit"} variant={"subtitle1"}>Name</Typography>
                                        <Typography gutterBottom color={"textSecondary"}
                                            variant={"subtitle2"}>{this.state.name}</Typography>

                                        <Typography color={"inherit"} variant={"subtitle1"}>Email</Typography>
                                        <Typography gutterBottom color={"textSecondary"}
                                            variant={"subtitle2"}>{this.state.email}</Typography>

                                        <Typography color={"inherit"} variant={"subtitle1"}>Mobile</Typography>
                                        <Typography gutterBottom color={"textSecondary"}
                                            variant={"subtitle2"}>{this.state.mobile}</Typography>

                                        <Typography color={"inherit"} variant={"subtitle1"}>Gender</Typography>
                                        <Typography gutterBottom color={"textSecondary"}
                                            variant={"subtitle2"}>{this.state.gender}</Typography>

                                        <Typography color={"inherit"} variant={"subtitle1"}>Birth Date</Typography>
                                        <Typography gutterBottom color={"textSecondary"}
                                            variant={"subtitle2"}>{moment(this.state.birthDate).format('MMMM Do YYYY')}</Typography>

                                        <Divider style={{ marginBottom: 20, marginTop: 20 }} />

                                        <Grid container justify={"center"}>
                                            <Button onClick={() => this.updateCustomerDialogRef.current.showDialog()} variant={"contained"} className={classes.update}>Update Profile</Button>
                                            <Button onClick={this.closeAccount} variant={"contained"} color={"secondary"}>Close Account</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                    }
                </Container>
            </React.Fragment >
        );
    }
}

export default (withStyles(styles)(withRouter(Profile)))
