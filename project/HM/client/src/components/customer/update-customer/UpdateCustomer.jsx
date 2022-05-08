import React, { Component } from 'react'

import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    Radio,
    RadioGroup,
    TextField
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import { updateCustomerService } from '../../../services/CustomerServices';
import { customerValidations } from '../../../validations/CustomerValidations';
import { SweetAlert } from '../../../services/SweetAlert';

class UpdateCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "DUMMY_PASS",
            mobile: "",
            gender: "",
            birthDate: null,
            image: {
                preview: "",
                raw: null
            },
            isShow: false,
            isModelShow: false,
            isImageChanged: false
        }
    }

    showDialog = () => {
        let customer = JSON.parse(localStorage.getItem("customer"));
        this.setState({
            isModelShow: true,
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

    handleClose = () => {
        this.setState({
            id: "",
            name: "",
            email: "",
            mobile: "",
            gender: "",
            birthDate: null,
            image: {
                preview: "",
                raw: null
            },
            isShow: false,
            isModelShow: false,
            isImageChanged: false
        });
    }

    // Function to convert date
    getDate = (date) => {
        if (date._isAMomentObject) {
            return date._d
        } else {
            return date
        }
    };

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

    updateCustomer = async () => {
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
            await updateCustomerService(
                this.state.id,
                {
                    ...customerValidationObj,
                    birthDate: this.getDate(this.state.birthDate),
                    image: (this.state.isImageChanged) ? this.state.image.raw : this.state.image.preview,
                    isImageChanged: this.state.isImageChanged
                }
            ).then(res => {
                this.setState({ isShow: false });
                if (res.status) {
                    this.handleClose();
                    this.props.updateProfileDetails();
                }
            })
        } else {
            this.setState({ isShow: false });
            SweetAlert("error", "Ooopz!", result.error)
        }
    }

    render() {
        return (
            <Dialog open={this.state.isModelShow} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Avatar
                                alt="user photo"
                                src={this.state.image.preview}
                                style={{ width: 150, height: 150, marginLeft: "35%" }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                disabled
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
                                label="User Name"
                                autoFocus
                                name="name"
                                size={"small"}
                                value={this.state.name}
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
                                    label="Birth Date"
                                    name="birthDate"
                                    maxDate={new Date()}
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
                                            isImageChanged: true,
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
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.updateCustomer} color="primary">
                        Update Profile
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default UpdateCustomer;