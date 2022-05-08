import React, { Component } from 'react'
import {
    Button,
    Card,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { crateEquipmentsService, updateEquipmentsServices } from '../../../services/EquipmentsServices';
import { equipmentsValidation } from '../../../validations/EquipmentsValidation';
import { SweetAlert } from '../../../services/SweetAlert';
import empImg from "../../../assets/images/img.jpg"


class EquipmentManagementDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purpose: "",
            id: "",
            name: "",
            equipmentId: "",
            country: "",
            SalesCount: "",
            image: null,
            isShow: false,
            isModelShow: false,
            isImageChanged: false
        }
    }

    showDialog = (purpose, data) => {
        if (purpose === "Create") {
            this.setState({
                purpose,
                isModelShow: true,
            });
        } else {

            this.setState({
                purpose,
                id: data._id,
                name: data.name,
                equipmentId: data.equipmentId,
                country: data.country,
                SalesCount: data.SalesCount,
                type: data.type,
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
            purpose: "",
            id: "",
            name: "",
            equipmentId: "",
            country: "",
            SalesCount: "",
            image: null,
            isShow: false,
            isModelShow: false,
            isImageChanged: false
        });
    }


    // Function to handle input Change
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    manageEquipments = async () => {
        this.setState({ isShow: true });

        let equipmentsValidationObj = {
            name: this.state.name,
            equipmentId: this.state.equipmentId,
            country: this.state.country,
            SalesCount: this.state.SalesCount,
            image: (this.state.image) ? this.state.image.preview : "",
        }

        // Validate input values
        const result = equipmentsValidation(equipmentsValidationObj);
        if (result.status) {

            if (this.state.purpose === "Create") {

                await crateEquipmentsService(
                    {
                        ...equipmentsValidationObj,
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

                await updateEquipmentsServices(
                    {
                        ...equipmentsValidationObj,
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
            <Dialog open={this.state.isModelShow} aria-labelledby="form-dialog-title">
                <Card style={{ width: "100%", overflow: 'hidden', overflowY: "auto" }}>
                    <CardMedia
                        style={{ height: 250, marginBottom: 20 }}
                        image={
                            this.state.image
                                ? this.state.image.preview
                                : empImg
                        }
                    />
                    <DialogContent style={{ marginBottom: 10 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    size={'small'}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Equipment Name"
                                    autoFocus
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    size={'small'}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Equipment Id"
                                    name="Equipment Id"
                                    value={this.state.equipmentId}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    size={'small'}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Country"
                                    name="country"
                                    value={this.state.country}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    size={'small'}
                                    type={"Number"}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="SalesCount"
                                    name="SalesCount"
                                    value={this.state.SalesCount}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={4}>
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
                </Card>

                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.manageEquipments} color="primary">
                        {this.state.purpose} Equipments
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EquipmentManagementDialog;