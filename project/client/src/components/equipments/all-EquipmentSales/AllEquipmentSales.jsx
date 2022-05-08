import React, { Component } from 'react'
import Swal from "sweetalert2";
import MaterialTable from "material-table";
import SearchIcon from '@material-ui/icons/Search';
import { green, red } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";
import { getAllEquipmentsServices, deleteEquipmentsServices } from '../../../services/EquipmentsServices';
import { Container, Grid, Icon, InputBase } from '@material-ui/core';
import EquipmentManagementDialog from '../equipment-dialogs/EquipmentManagementDialog';

const styles = (theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        border: "1px solid #512da8",
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "#512da8"
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: 50,
        width: 300,
    },
});


class AllEquipmentSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allEquipmentSales: [],
            filteredEquipmentSales: [],
            searchTag: "",
            isShow: true
        }
    }

    getAllEquipmentSales = () => {
        getAllEquipmentsServices().then(res => {
            if (res.status) {
                this.setState({
                    allEquipmentSales: res.equipmentSales,
                    filteredEquipmentSales: res.equipmentSales,
                    isShow: false
                });

            } else {
                this.setState({
                    isShow: false
                });
            }
        })
    }

    componentDidMount() {
        this.getAllEquipmentSales();
    }

    /*get table icons*/
    getIcon = (icon) => {
        if (icon === "add") return <Icon color="primary">add_circle</Icon>;
        else if (icon === "edit")
            return <Icon style={{ color: green[500] }}>edit</Icon>;
        else return <Icon style={{ color: red[500] }}>delete</Icon>;
    };

    search = (e) => {
        let searchTag = e.target.value;
        let filteredEquipmentSales = [];

        this.state.allEquipmentSales.forEach(equipmentSales => {
            if (equipmentSales.name.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredEquipmentSales.push(equipmentSales);
            } else if (equipmentSales.equipmentId.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredEquipmentSales.push(equipmentSales);
            } else if (equipmentSales.country.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredEquipmentSales.push(equipmentSales);
            } else if (equipmentSales.SalesCount.toString().toLowerCase().includes(searchTag.toLowerCase())) {
                filteredEquipmentSales.push(equipmentSales);
            } 
        })

        this.setState({
            searchTag,
            filteredEquipmentSales
        });
    }

    equipmentSalesRef = React.createRef();

    // Function to delete employee
    removeEquipmentSales = (id) => {
        this.setState({
            isShow: true
        });
        Swal.fire({
            title: 'Confirmation',
            text: "Are you want to delete this sale.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEquipmentsServices(id).then(res => {
                    this.getAllEquipmentSales();
                })
            }
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Container style={{ marginTop: 50 }}>
                <EquipmentManagementDialog ref={this.equipmentSalesRef} updateContent={this.getAllEquipmentSales} />
                <Grid container justifyContent={'center'}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={this.state.searchTag}
                            onChange={(e) => this.search(e)}
                        />
                    </div>
                </Grid>
                <MaterialTable
                    title="All Equipment Sales"
                    columns={[
                        {
                            title: 'Image',
                            field: 'imageUrl',
                            render: rowData => (
                                <img
                                    style={{ height: "50px", width: "50px", borderRadius: '50%' }}
                                    src={rowData.imageURL}
                                />
                            ),
                            export: false
                        },
                        { title: "equipment Id", field: "equipment Id" },
                        { title: "Equipment Name", field: "name" },
                        { title: "Country", field: "country" },
                        { title: "Sales Count", field: "Sales Count" },
                        
                    ]}
                    data={this.state.filteredEquipmentSales.map(o => ({
                        ...o,
                    }))}
                    options={{
                        actionsColumnIndex: -1,
                        exportButton: true,
                        search: false,
                        headerStyle: {
                            backgroundColor: "#512da8",
                            color: "#FFF",
                        },
                    }}
                    actions={[
                        {
                            icon: () => this.getIcon("add"),
                            tooltip: "Add New Equipment Sales",
                            isFreeAction: true,
                            onClick: (event) =>
                                this.equipmentSalesRef.current.showDialog("Create", null),
                        },
                        {
                            icon: () => this.getIcon("edit"),
                            tooltip: "Update Equipment",
                            onClick: (event, rowData) =>
                                this.equipmentSalesRef.current.showDialog("Update", rowData),
                        },
                        {
                            icon: () => this.getIcon("delete"),
                            tooltip: "Delete Equipment",
                            onClick: (event, rowData) =>
                                this.removeEquipmentSales(rowData._id),
                        },
                    ]}
                />
            </Container>
        );
    }
}

export default withStyles(styles)(AllEquipmentSales)