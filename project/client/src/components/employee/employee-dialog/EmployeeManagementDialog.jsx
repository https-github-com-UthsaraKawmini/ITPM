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
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import { createEmployeeService, updateEmployeeService } from '../../../services/EmployeeServices';
import { employeeValidations } from '../../../validations/EmployeeValidations';
import { SweetAlert } from '../../../services/SweetAlert';
import empImg from "../../../assets/images/user.png"
import empback from "../../../assets/images/employee-cover.jpg"

class EmployeeManagementDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            id: "",
            name: "",
            email: "",
            mobile: "",
            gender: "",
            birthDate: null,
            joinDate: null,
            salary: "",
            image: null,
            isShow: false,
            isModelShow: false,
            isImageChanged: false
        }
    }

    showDialog = (type, data) => {
        if (type === "Create") {
            this.setState({
                type,
                isModelShow: true,
            });
        } else {

            console.log(data);
            this.setState({
                type,
                id: data._id,
                name: data.name,
                email: data.email,
                mobile: data.mobile,
                gender: data.gender,
                birthDate: data.birthDate,
                joinDate: data.joinDate,
                salary: data.salary,
                image: {
                    preview: data.imageURL,
                    raw: null
                },
                isShow: false,
                isImageChanged: false,
                isModelShow: true,
            });
        }
    }

    handleClose = () => {
        this.setState({
            type: "",
            id: "",
            name: "",
            email: "",
            mobile: "",
            gender: "",
            birthDate: null,
            joinDate: null,
            salary: "",
            image: null,
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

    // Function to handle birthday
    updateBirthDate = (date) => {
        this.setState({
            birthDate: date
        })
    };

    // Function to handle join date
    updatJoinDate = (date) => {
        this.setState({
            joinDate: date
        })
    };

    manageEmployee = async () => {
        this.setState({ isShow: true });

        let employeeValidationObj = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            salary: this.state.salary,
            gender: this.state.gender,
            birthDate: (this.state.birthDate) ? "Date Selected" : "",
            joinDate: (this.state.joinDate) ? "Date Selected" : "",
            image: (this.state.image) ? this.state.image.preview : "",
        }

        // Validate input values
        const result = employeeValidations(employeeValidationObj);
        if (result.status) {

            if (this.state.type === "Create") {

                await createEmployeeService(
                    {
                        ...employeeValidationObj,
                        birthDate: this.getDate(this.state.birthDate),
                        joinDate: this.getDate(this.state.joinDate),
                        image: this.state.image.raw
                    }
                ).then(res => {
                    this.setState({ isShow: false });
                    if (res.status) {
                        this.handleClose();
                        this.props.updateContent();
                    }
                })

            } else {


                await updateEmployeeService(
                    {
                        ...employeeValidationObj,
                        birthDate: this.getDate(this.state.birthDate),
                        joinDate: this.getDate(this.state.joinDate),
                        image: (this.state.isImageChanged) ? this.state.image.raw : this.state.image.preview,
                        isImageChanged: this.state.isImageChanged,
                        id: this.state.id,
                    }
                ).then(res => {
                    this.setState({ isShow: false });
                    if (res.status) {
                        this.handleClose();
                        this.props.updateContent();
                    }
                })

            }

        } else {
            this.setState({ isShow: false });
            SweetAlert("error", "Ooopz!", result.error)
        }
    }


    render() {
        return (
            <Dialog open={this.state.isModelShow} aria-labelledby="form-dialog-title" maxWidth={'md'} fullWidth>
                <div style={{
                    width: "100%",
                    overflow: 'hidden',
                    overflowY: "auto",
                }}>
                    <Grid container justifyContent={'center'}
                        style={{
                            backgroundColor: "red",
                            marginBottom: 30,
                            backgroundImage: `url(${empback})`,
                            backgroundPosition: "cover"
                        }}
                    >
                        <Avatar
                            alt="user photo"
                            src={
                                this.state.image
                                    ? this.state.image.preview
                                    : empImg
                            }
                            style={{ width: 150, height: 150, marginBottom: 20, border: "2px solid white", marginTop: 30 }}
                        />
                    </Grid>
                    <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    size={"small"}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="User Name"
                                    autoFocus
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    size={"small"}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    size={"small"}
                                    type={"Number"}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Mobile Number"
                                    name="mobile"
                                    value={this.state.mobile}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    size={"small"}
                                    type={"Number"}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Salary"
                                    name="salary"
                                    value={this.state.salary}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DatePicker
                                        autoOk
                                        size={"small"}
                                        fullWidth
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
                            <Grid item xs={12} md={4}>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DatePicker
                                        autoOk
                                        fullWidth
                                        required
                                        size={"small"}
                                        variant="inline"
                                        inputVariant="outlined"
                                        label="Join Date"
                                        name="joinDate"
                                        maxDate={new Date()}
                                        value={this.state.joinDate}
                                        onChange={(date) => this.updatJoinDate(date)}
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
                </div>

                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.manageEmployee} color="primary">
                        {this.state.type} Employee
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EmployeeManagementDialog;