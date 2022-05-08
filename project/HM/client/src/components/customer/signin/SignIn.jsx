import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import logo from "../../../assets/images/logo.jpg"
import signInImg from "../../../assets/images/sign-in.jpg"
import { customerSignInValidations } from '../../../validations/CustomerValidations';
import { SweetAlert } from '../../../services/SweetAlert';
import { customerSignINService } from '../../../services/CustomerServices';
import {
    Avatar,
    Backdrop,
    Button,
    Checkbox,
    CircularProgress,
    CssBaseline,
    FormControlLabel,
    Grid,
    Paper,
    TextField,
    Typography
} from '@material-ui/core';




const styles = (theme) => ({

    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: `url(${signInImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(4, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(3),
    },
    submit: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    form: {
        marginTop: 10
    }
});


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isShow: false
        }
    }

    // Function to handle input Change
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Function to sign up
    signUp = async (e) => {
        e.preventDefault();
        this.setState({ isShow: true });

        let customerValidationObj = {
            email: this.state.email,
            password: this.state.password,
        }

        const result = customerSignInValidations(customerValidationObj);
        if (result.status) {
            await customerSignINService(customerValidationObj).then(res => {
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

    render() {
        const { classes } = this.props;
        return (
            <Grid container component="main" className={classes.root}>
                <Backdrop className={classes.backdrop} open={this.state.isShow}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <CssBaseline />
                <Grid item xs={false} sm={5} md={7} className={classes.image} />
                <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6}>
                    <div className={classes.paper}>
                        <Avatar
                            alt="Logo"
                            src={
                                logo
                            }
                            className={classes.large}
                        />
                        <Typography gutterBottom align={"center"} color={"primary"} component="h1" variant="h5">
                            Sign In
                        </Typography>
                        <form onSubmit={this.signUp} className={classes.form} noValidate>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        size={"small"}
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        size={"small"}
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                            </Grid>
                            <Button
                                type="submit"
                                size={"large"}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
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