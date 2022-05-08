import React, { Component } from 'react';
import {
    Avatar,
    Backdrop,
    Button,
    CircularProgress,
    CssBaseline,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@material-ui/core';
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import userImg from "../../../assets/images/user.png"
import { signUpValidations } from '../../../validations/UserValidations';
import { SweetAlert } from '../../../services/SweetAlert';
import { signupService } from '../../../services/user-services';

import styles from './styles';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            email: "",
            password: "",
            mobile: "",
            userType: "",
            address: "",
            image: null,
            isShow: false
        }
    }

    // handle input Change
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
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

    // sign up function
    signUp = async (e) => {
        e.preventDefault();
        this.setState({ isShow: true });

        let userValidation = {
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
            mobile: this.state.mobile,
            userType: this.state.userType,
            address: this.state.address,
            image: (this.state.image) ? this.state.image.preview : "",
        }

        const result = signUpValidations(userValidation);
        if (result.status) {
            await signupService({
                ...userValidation,
                image: this.state.image.raw
            }).then(res => {
                this.setState({ isShow: false });
                if (res.status) {
                    this.props.history.push("/SignIn");
                }
            })
        } else {
            this.setState({ isShow: false });
            SweetAlert("error", "Ooopz!", result.error)
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container component="main" className={classes.root}>
                <Backdrop className={classes.backdrop} open={this.state.isShow}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <CssBaseline />
                <Grid item xs={false} sm={5} md={5} className={classes.image} />
                <Grid item xs={12} sm={7} md={7} component={Paper} elevation={6}>
                    <div className={classes.paper}>
                        <Avatar
                            alt="user photo"
                            src={
                                this.state.image
                                    ? this.state.image.preview
                                    : userImg
                            }
                            className={classes.large}
                        />
                        <Typography gutterBottom align={"center"} color={"primary"} component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <form onSubmit={this.signUp} className={classes.form} noValidate>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="User Name"
                                        name="userName"
                                        size={"small"}
                                        value={this.state.userName}
                                        onChange={this.handleInputChange}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Email Address"
                                        name="email"
                                        size={"small"}
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        size={"small"}
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Mobile Number"
                                        name="mobile"
                                        size={"small"}
                                        value={this.state.mobile}
                                        onChange={this.handleInputChange}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        multiline
                                        variant="outlined"
                                        label="Delivery Address"
                                        name="address"
                                        size={"small"}
                                        value={this.state.address}
                                        onChange={this.handleInputChange}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid container alignItems={'center'} spacing={3} style={{ marginTop: 8 }}>
                                <Grid item xs={6}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Status</FormLabel>
                                        <RadioGroup row aria-label="userType" name="userType" value={this.state.userType} onChange={this.handleInputChange}>
                                            <FormControlLabel value="customer" color={"primary"} control={<Radio />} label="Customer" />
                                            <FormControlLabel value="instructor" control={<Radio />} label="Instructor" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
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
                                            variant="outlined"
                                            color="default"
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
                                type="submit"
                                size={"large"}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/SignIn">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(withStyles(styles)(SignUp))
