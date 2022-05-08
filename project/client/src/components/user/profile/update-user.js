import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Avatar, Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { updateUserValidations } from "../../../validations/UserValidations";
import { updateUserService } from "../../../services/user-services"
import styles from './styles';
import { withStyles } from "@material-ui/core/styles";

class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            mobile: "",
            address: "",
            isImageUpdated: false,
            image: null,
        }
    }

    // Get the user details from the local storage and set to fields  
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("user"));
        this.setState({
            userName: user.userName,
            mobile: user.mobile,
            address: user.address,
            image: user.imageURL,
            image: {
                preview: user.imageURL,
                raw: null
            }
        })
    }

    // Function to change the image file
    changeImageFile = (e) => {
        if (e.target.files.length) {
            this.setState({
                image: {
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0],
                }
            })
        }
    }

    // Handle input values
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Update user
    updateUser = async (e) => {
        e.preventDefault();

        let updateUserValidation = {
            userName: this.state.userName,
            mobile: this.state.mobile,
            address: this.state.address,
            image: (this.state.image) ? this.state.image.preview : "",
        }

        const result = updateUserValidations(updateUserValidation);
        if (result.status) {
            await updateUserService(JSON.parse(localStorage.getItem("user"))._id ,{
                ...updateUserValidation,
                isImageUpdated: this.state.isImageUpdated,
                image: (this.state.isImageUpdated) ? this.state.image.raw : this.state.image.preview,
            }).then(res => {
                if (res.status) {
                    this.props.history.push("/profile");
                }
            })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Container style={{ marginTop: 50 }}>
                <Grid container justifyContent={'center'}>
                    <form onSubmit={this.updateUser} noValidate>
                        <Grid container spacing={3} justifyContent={"center"} alignContent={"center"}>
                            <Grid item xs={12}>
                                <Typography gutterBottom align={"center"} color={"primary"} component="h1" variant="h5">
                                    Update Account
                                </Typography>

                            </Grid>
                            <Avatar
                                style={{ width: "200px", height: "200px" }}
                                alt="user photo"
                                src={
                                    this.state.image && this.state.image.preview
                                }
                            /><Grid item xs={12} />
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="User Name"
                                    autoFocus
                                    name="userName"
                                    size={"small"}
                                    value={this.state.userName}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Mobile"
                                    name="mobile"
                                    size={"small"}
                                    value={this.state.mobile}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    multiline
                                    variant="outlined"
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    size={"small"}
                                    value={this.state.address}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container alignItems={'center'} spacing={3} style={{ marginTop: 8 }}>
                            <Grid item xs={4}>
                                <input
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    multiple
                                    id="contained-button-file"
                                    type="file"
                                    onChange={(e) => this.changeImageFile(e)}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button
                                        type='submit'
                                        variant="outlined"
                                        component="span"
                                        fullWidth
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload Image
                                    </Button>
                                </label>
                            </Grid>
                        </Grid>
                        <Button
                            className={classes.update}
                            fullWidth
                            style={{ marginTop: 20 }}
                            type="submit"
                            size={"large"}
                            variant="contained"
                            color="primary"
                        >
                            Update Account
                        </Button>
                    </form>
                </Grid>
            </Container>
        );
    }
}

export default (withStyles(styles)(withRouter(UpdateUser)))