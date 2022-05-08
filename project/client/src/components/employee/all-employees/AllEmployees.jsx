import React, { Component } from 'react'
import Swal from "sweetalert2";
import MaterialTable from "material-table";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import { deleteEmployeeervice, getAllEmployeeService } from '../../../services/EmployeeServices';
import { Container, Grid, Icon, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { green, red } from '@material-ui/core/colors';

import EmployeeManagementDialog from '../employee-dialog/EmployeeManagementDialog';
import EmployeeViewMore from './EmployeeViewMore';

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


class AllEmployees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allEmployees: [],
            filteredEmployees: [],
            searchTag: "",
            isShow: true
        }
    }

    getAllEmployees = () => {
        getAllEmployeeService().then(res => {
            if (res.status) {
                this.setState({
                    allEmployees: res.employees,
                    filteredEmployees: res.employees,
                    isShow: false
                });

                console.log(res.employees);
            } else {
                this.setState({
                    isShow: false
                });
            }
        })
    }

    componentDidMount() {
        this.getAllEmployees();
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
        let filteredEmployees = [];

        console.log(this.state);

        this.state.allEmployees.forEach(employee => {
            if (employee.name.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredEmployees.push(employee);
            } else if (employee.email.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredEmployees.push(employee);
            } else if (employee.mobile.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredEmployees.push(employee);
            } else if (employee.gender.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredEmployees.push(employee);
            } else if (moment(employee.birthDate).format('MMMM Do YYYY').toLowerCase().includes(searchTag.toLowerCase())) {
                filteredEmployees.push(employee);
            } else if (moment(employee.joinDate).format('MMMM Do YYYY').toLowerCase().includes(searchTag.toLowerCase())) {
                filteredEmployees.push(employee);
            }
        })

        this.setState({
            searchTag,
            filteredEmployees
        });
    }

    employeeDialogRef = React.createRef();

    // Function to delete employee
    // Finctions to close the account

    
    removeEmployee = (id) => {
        this.setState({
            isShow: true
        });
        Swal.fire({
            title: 'Confirmation',
            text: "Are you want to delete this employee.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEmployeeervice(id).then(res => {
                    this.getAllEmployees();
                })
            }
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Container style={{ marginTop: 50 }}>
                <EmployeeManagementDialog ref={this.employeeDialogRef} updateContent={this.getAllEmployees} />
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
                    title="EMPLOYEE SALARIES "
                    columns={[
                        { title: "Name", field: "name" },
                        { title: "Email", field: "email" },
                        { title: "Mobile", field: "mobile" },
                        { title: "Gender", field: "gender" },
                        {
                            title: "Birth Date",
                            field: "birthDate",
                            render: rowData => (
                                moment(rowData.birthDate).format('MMMM Do YYYY')
                            ),
                        },
                        {
                            title: "Join Date",
                            field: "joinDate",
                            render: rowData => (
                                moment(rowData.joinDate).format('MMMM Do YYYY')
                            ),
                        },
                        
                        { title: "Salary", field: "salary" },

                    ]}
                    data={this.state.filteredEmployees.map(o => ({
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
                            tooltip: "Add New Employee",
                            isFreeAction: true,
                            onClick: (event) =>
                                this.employeeDialogRef.current.showDialog("Create", null),
                        },
                        {
                            icon: () => this.getIcon("edit"),
                            tooltip: "Update Employee",
                            onClick: (event, rowData) =>
                                this.employeeDialogRef.current.showDialog("Update", rowData),
                        },
                        {
                            icon: () => this.getIcon("delete"),
                            tooltip: "Delete Employee",
                            onClick: (event, rowData) =>
                                this.removeEmployee(rowData._id),
                        },
                    ]}
                    onRowClick={(event, rowData, togglePanel) => togglePanel()}
                    detailPanel={[
                        {
                            tooltip: "View More Employee",
                            render: (rowData) => {
                                return (
                                    <div
                                        style={{
                                            marginTop: "0px",
                                        }}
                                    >
                                        <EmployeeViewMore employee={rowData} />
                                    </div>
                                );
                            },
                        },
                    ]}

                />
            </Container>
        );
    }
}

export default withStyles(styles)(AllEmployees)