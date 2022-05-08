import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { fetchAllUsersService } from '../../../services/user-services';
import { Container, Grid, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styles from './styles';
import MaterialTable from "material-table";

class AllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            filteredUsers: [],
            searchTag: "",
            isShow: true
        }
    }

    // Get all users from the db
    componentDidMount() {
        fetchAllUsersService().then(res => {
            if (res.status) {
                this.setState({
                    allUsers: res.users,
                    filteredUsers: res.users,
                    isShow: false
                });
            } else {
                this.setState({
                    isShow: false
                });
            }
        })
    }

    // Filter users by search input
    search = (e) => {
        let searchTag = e.target.value;
        let filteredUsers = [];

        this.state.allUsers.forEach(user => {
            if (user.userName.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredUsers.push(user);
            } else if (user.email.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredUsers.push(user);
            } else if (user.mobile.toString().includes(searchTag.toLowerCase())) {
                filteredUsers.push(user);
            } else if (user.address.toString().includes(searchTag.toLowerCase())) {
                filteredUsers.push(user);
            }else if (user.userType.toString().includes(searchTag.toLowerCase())) {
                filteredUsers.push(user);
            }
        })

        this.setState({
            searchTag,
            filteredUsers
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
                    title="All Users"
                    columns={[
                        {
                            title: 'Image',
                            field: 'imageURL',
                            render: rowData => (
                                <img
                                    style={{ height: "45px", width: "45px", borderRadius: '45%' }}
                                    src={rowData.imageURL}
                                />
                            ),
                            export: false
                        },
                        { title: "User Name", field: "userName" },
                        { title: "Email", field: "email" },
                        { title: "Mobile", field: "mobile" },
                        { title: "Address", field: "address" },
                        { title: "Status", field: "userType" },

                    ]}
                    data={this.state.filteredUsers.map(o => ({ ...o }))}
                    options={{
                        exportButton: true,
                        search: false,
                    }}
                />
            </Container>
        );
    }
}

export default withRouter(withStyles(styles)(AllUsers))