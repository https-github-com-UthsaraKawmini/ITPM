import React, { Component } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { getAvailableEquipments } from "../../../../services/equipment-services";
import EquipmentSmallView from './equipment-small-view';

class EquipmentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipments: []
        }
    }

    // fetch all equipments from the server
    componentDidMount() {
        getAvailableEquipments().then(res => {
            if (res.status) {
                this.setState({
                    equipments: res.equipments,
                });
            }
        })
    }

    render() {
        return (
            <Container style={{ marginBottom: 50 }}>
                <Typography style={{ marginTop: 50, marginBottom: 30 }} gutterBottom variant={"h3"} align={'center'} color={"textSecondary"}>Equipments</Typography>
                <Grid container spacing={2}>
                    {
                        this.state.equipments.map(eq => {
                            return <EquipmentSmallView key={eq._id} equipment={eq} />
                        })
                    }
                </Grid>
            </Container>
        );
    }
}

export default EquipmentContainer;
