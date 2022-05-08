import React, { Component } from 'react';
import {
    Avatar,
    Backdrop,
    Button,
    CircularProgress,
    Grid,
    Paper,
    TextField,
    Typography
} from '@material-ui/core';
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import logo from "../../../assets/images/logo.png"
import { signInValidations } from '../../../validations/UserValidations';
import { SweetAlert } from '../../../services/SweetAlert';
import { signInService } from '../../../services/user-services';
import styles from './styles';


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isShow: false
        }
    }

    // Function to sign up
    signIn = async (e) => {
        e.preventDefault();
        this.setState({ isShow: true });

        // Validate the inputs
        const result = signInValidations({
            email: this.state.email,
            password: this.state.password,
        });

        if (result.status) {
            await signInService({
                email: this.state.email,
                password: this.state.password,
            }).then(res => {
                this.setState({ isShow: false });
                if (res.status) {
                    this.props.history.push("/");
                }
            })
        } else {
            this.setState({ isShow: false });
            SweetAlert("error", "Ooopz!", result.error)
        }
    }

    // handle input Change
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container component="main" className={classes.root}>
                <Backdrop className={classes.backdrop} open={this.state.isShow}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Grid item xs={false} sm={5} className={classes.image} />
                <Grid item xs={12} sm={7} component={Paper} elevation={6}>
                    <div className={classes.paper}>
                        <Avatar
                            alt="Logo"
                            src={
                                logo
                            }
                            className={classes.large}
                        />
                        <Typography gutterBottom align={"center"} color={"primary"} component="h1" variant="h5">
                            Login
                        </Typography>
                        <form onSubmit={this.signIn} className={classes.form} noValidate>
                            <Grid container spacing={3}>
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
                            </Grid>
                            <Button
                                type="submit"
                                size={"large"}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Login
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to="/SignUp">
                                        {"Don't have an account? Sign Up"}
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

export default withRouter(withStyles(styles)(SignIn))