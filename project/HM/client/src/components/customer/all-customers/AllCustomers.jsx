import React, { Component } from 'react'

import MaterialTable from "material-table";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import { getAllCustomerService } from '../../../services/CustomerServices';
import { Container, Grid, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const styles = (theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#eee",
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


class AllCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCustomers: [],
            filteredAllCustomers: [],
            searchTag: "",
            isShow: true
        }
    }

    componentDidMount() {
        getAllCustomerService().then(res => {
            if (res.status) {
                this.setState({
                    allCustomers: res.customers,
                    filteredAllCustomers: res.customers,
                    isShow: false
                });
            } else {
                this.setState({
                    isShow: false
                });
            }
        })
    }

    search = (e) => {
        let searchTag = e.target.value;
        let filteredAllCustomers = [];

        this.state.allCustomers.forEach(cus => {
            if (cus.name.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredAllCustomers.push(cus);
            } else if (cus.email.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredAllCustomers.push(cus);
            } else if (cus.mobile.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredAllCustomers.push(cus);
            } else if (cus.gender.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredAllCustomers.push(cus);
            } else if (moment(cus.birthDate).format('MMMM Do YYYY').toLowerCase().includes(searchTag.toLowerCase())) {
                filteredAllCustomers.push(cus);
            }
        })

        this.setState({
            searchTag,
            filteredAllCustomers
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Container style={{ marginTop: 50 }}>
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
                    title="All Customers"
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
                        { title: "Name", field: "name" },
                        { title: "Email", field: "email" },
                        { title: "Gender", field: "gender" },
                        { title: "Mobile", field: "mobile" },
                        { title: "Birth Date", field: "birthDate" },

                    ]}
                    data={this.state.filteredAllCustomers.map(o => ({ ...o, birthDate: moment(o.birthDate).format('MMMM Do YYYY') }))}
                    options={{
                        exportButton: true,
                        search: false,
                        headerStyle: {
                            backgroundColor: "#512da8",
                            color: "#FFF",
                        },
                    }}
                />
            </Container>
        );
    }
}

export default withStyles(styles)(AllCustomers)