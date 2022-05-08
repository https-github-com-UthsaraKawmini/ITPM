import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { getAllEquipments } from '../../../../services/equipment-services';
import { Container, Grid, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styles from './styles';
import MaterialTable from "material-table";

class AllEquipments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allEquipments: [],
            filteredEquipments: [],
            searchTag: "",
            isShow: true
        }
    }

    // Fetch equipments from the server
    componentDidMount() {
        getAllEquipments().then(res => {
            if (res.status) {
                this.setState({
                    allEquipments: res.equipments,
                    filteredEquipments: res.equipments,
                    isShow: false
                });
            } else {
                this.setState({
                    isShow: false
                });
            }
        })
    }

    // search the equipments
    search = (e) => {
        let searchTag = e.target.value;
        let filteredEquipments = [];

        this.state.allEquipments.forEach(eq => {
            if (eq.name.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredEquipments.push(eq);
            } else if (eq.description.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredEquipments.push(eq);
            } else if (eq.price.toString().includes(searchTag.toLowerCase())) {
                filteredEquipments.push(eq);
            } else if (eq.quantity.toString().includes(searchTag.toLowerCase())) {
                filteredEquipments.push(eq);
            }
        })

        this.setState({
            searchTag,
            filteredEquipments
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
                    title="All Equipments"
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
                        { title: "Name", field: "name" },
                        { title: "Description", field: "description" },
                        { title: "Price", field: "price" },
                        { title: "Quantity", field: "quantity" },

                    ]}
                    data={this.state.filteredEquipments.map(o => ({ ...o }))}
                    options={{
                        exportButton: true,
                        search: false,
                    }}
                    actions={[
                        {
                            icon: 'add',
                            tooltip: 'Add Equipment',
                            isFreeAction: true,
                            onClick: (event) => this.props.history.push("/admin/create-equipment")
                        }
                    ]}
                />
            </Container>
        );
    }
}

export default withRouter(withStyles(styles)(AllEquipments))