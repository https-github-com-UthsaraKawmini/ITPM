import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Avatar, Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import dummy_equipment from '../../../../assets/images/dummy-equipment.jpg';
import {EquipmentValidations} from "../../../../validations/EquipmentValidations";
import {createEquipmentService} from "../../../../services/equipment-services"
import { SweetAlert } from '../../../../services/SweetAlert';

class CreateEquipments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            quantity: "",
            description: "",
            image: null,
            isShow: false
        }
    }

    // Manage react input fields values 
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Function to create equipment
    createEquipment = async (e) => {
        e.preventDefault();
        this.setState({ isShow: true });

        let equipmentValidation = {
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity,
            description: this.state.description,
            image: (this.state.image) ? this.state.image.preview : "",
        }

        const result = EquipmentValidations(equipmentValidation);
        if (result.status) {
            await createEquipmentService({
                ...equipmentValidation,
                image: this.state.image.raw
            }).then(res => {
                this.setState({ isShow: false });
                if (res.status) {
                    this.props.history.push("/admin/all-equipments");
                }
            })
        } else {
            this.setState({ isShow: false });
            SweetAlert("error", "Ooopz!", result.error)
        }
    }

    render() {
        return (
            <Container style={{ marginTop: 50 }}>
                <Grid container justifyContent={'center'}>
                    <form onSubmit={this.createEquipment} noValidate>
                        <Grid container spacing={3} justifyContent={"center"} alignContent={"center"}>
                            <Grid item xs={12}>
                                <Typography gutterBottom align={"center"} color={"primary"} component="h1" variant="h5">
                                    Create Equipment
                                </Typography>

                            </Grid>
                            <Avatar
                                style={{ width: "200px", height: "200px" }}
                                alt="user photo"
                                src={
                                    this.state.image
                                        ? this.state.image.preview
                                        : dummy_equipment
                                }
                            />
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Name"
                                    autoFocus
                                    name="name"
                                    size={"small"}
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    size={"small"}
                                    value={this.state.price}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="quantity"
                                    label="quantity"
                                    type="number"
                                    size={"small"}
                                    value={this.state.quantity}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    multiline
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    size={"small"}
                                    value={this.state.description}
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
                            fullWidth
                            style={{ marginTop: 20 }}
                            type="submit"
                            size={"large"}
                            variant="contained"
                            color="primary"
                        >
                            Create Equipment
                        </Button>
                    </form>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(CreateEquipments)