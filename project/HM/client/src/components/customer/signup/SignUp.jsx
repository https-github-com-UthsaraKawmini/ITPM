import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import EventIcon from '@material-ui/icons/Event';
import userImg from "../../../assets/images/user.png"
import signUpImg from "../../../assets/images/sign-up.jpg"
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
    IconButton,
    InputAdornment,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@material-ui/core';

import {
    MuiPickersUtilsProvider,
    DatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import { customerValidations } from '../../../validations/CustomerValidations';
import { SweetAlert } from '../../../services/SweetAlert';
import { customerSignUpService } from '../../../services/CustomerServices';


const styles = (theme) => ({

    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: `url(${signUpImg})`,
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
        width: theme.spacing(15),
        height: theme.spacing(15),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
});


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            mobile: "",
            gender: "",
            birthDate: null,
            image: null,
            isShow: false
        }
    }

    // Function to handle input Change
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Function to handle  calander
    updateBirthDate = (date) => {
        this.setState({
            birthDate: date
        })
    };

    // Function to convert date
    getDate = (date) => {
        if (date._isAMomentObject) {
            return date._d
        } else {
            return date
        }
    };


    // Function to sign up
    signUp = async (e) => {
        e.preventDefault();
        this.setState({ isShow: true });

        let customerValidationObj = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            mobile: this.state.mobile,
            gender: this.state.gender,
            birthDate: (this.state.birthDate) ? "Date Selected" : "",
            image: (this.state.image) ? this.state.image.preview : "",
        }

        const result = customerValidations(customerValidationObj);
        if (result.status) {
            await customerSignUpService({
                ...customerValidationObj,
                birthDate: this.getDate(this.state.birthDate),
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
                <Grid item xs={false} sm={5} md={7} className={classes.image} />
                <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6}>
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
                                        required
                                        fullWidth
                                        label="User Name"
                                        autoFocus
                                        name="name"
                                        size={"small"}
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
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
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Mobile Number"
                                        name="mobile"
                                        size={"small"}
                                        value={this.state.mobile}
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DatePicker
                                            autoOk
                                            fullWidth
                                            size={"small"}
                                            required
                                            variant="inline"
                                            inputVariant="outlined"
                                            maxDate={new Date()}
                                            label="Birth Date"
                                            name="birthDate"
                                            value={this.state.birthDate}
                                            onChange={(date) => this.updateBirthDate(date)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton>
                                                            <EventIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>
                            <Grid container alignItems={'center'} spacing={3} style={{ marginTop: 8 }}>
                                <Grid item xs={6}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup row aria-label="gender" name="gender" value={this.state.gender} onChange={this.handleInputChange}>
                                            <FormControlLabel value="female" color={"primary"} control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
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
                                        onChange={(e) => {
                                            if (e.target.files.length) {
                                                this.setState({
                                                    image: {
                                                        preview: URL.createObjectURL(e.target.files[0]),
                                                        raw: e.target.files[0],
                                                    }
                                                })
                                            }
                                        }}
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