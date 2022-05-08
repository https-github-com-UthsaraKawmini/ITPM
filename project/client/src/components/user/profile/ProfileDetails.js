import React, { Component } from 'react';
import { Avatar, Backdrop, Button, Card, CircularProgress, Container, Divider, Grid, Typography } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import { deleteUserService } from '../../../services/user-services';
import styles from './styles';
import ProfileDetailsItem from './profile-details-item';

class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            userName: "",
            email: "",
            mobile: "",
            userType: "",
            address: "",
            image: null,
            isImageChanged: false,
            isShow: true
        }
    }

    // get confirmation from the user to delete account
    deleteAccount = () => {
        Swal.fire({
            title: 'Confirmation',
            text: "Do you need to delete this account. Note that, this process can not revert!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Confirm Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUserService(this.state.id).then(res => {
                    if (res.status) {
                        this.props.history.push("/SignIn");
                    }
                })
            }
        })

    }

    updateProfileDetails = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            this.props.history.push("/SignIn");
        } else {
            this.setState({
                isShow: false,
                id: user._id,
                userName: user.userName,
                email: user.email,
                mobile: user.mobile,
                address: user.address,
                userType: user.userType,
                image: {
                    preview: user.imageURL,
                    raw: null
                }
            });
        }
    }

    componentDidMount() {
        this.updateProfileDetails()
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
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

                                        <Typography gutterBottom variant={"h4"} color={'textSecondary'}>My Account</Typography>

                                        <Divider style={{ marginBottom: 20 }} />

                                        <ProfileDetailsItem details={{
                                            title: "User Name",
                                            body: this.state.userName
                                        }} />

                                        <ProfileDetailsItem details={{
                                            title: "Email",
                                            body: this.state.email
                                        }} />
                                        
                                        <ProfileDetailsItem details={{
                                            title: "Mobile",
                                            body: this.state.mobile
                                        }} />
                                        
                                        <ProfileDetailsItem details={{
                                            title: "Delivery Address",
                                            body: this.state.address
                                        }} />
                                        
                                        <ProfileDetailsItem details={{
                                            title: "Status",
                                            body: this.state.userType
                                        }} />

                                        <Divider style={{ marginBottom: 20, marginTop: 20 }} />

                                        <Grid container justify={"center"}>
                                            <Button onClick={() => this.props.history.push("/update-user")} variant={"contained"} className={classes.update}>Update Account</Button>
                                            <Button onClick={this.deleteAccount} variant={"contained"} color={"secondary"}>Delete Account</Button>
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

export default (withStyles(styles)(withRouter(ProfileDetails)))
