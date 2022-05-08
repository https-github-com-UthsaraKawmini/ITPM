import React, { Component } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { getAllEquipmentsServices } from '../../../services/EquipmentsServices';
import EquipmentSmallView from './EquipmentSmallView';


class EquipmentsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipments: []
        }
    }

    componentDidMount() {
        getAllEquipmentsServices().then(res => {
            if (res.status) {
                this.setState({
                    equipments: res.equipments,
                });

            } else {
                this.setState({
                    isShow: false
                });
            }
        })
    }

    render() {
        return (
            <Container>
                <Typography style={{ marginTop: 50 }} gutterBottom variant={"h3"} align={'center'} color={"textSecondary"}>Equipments</Typography>
                <Grid container spacing={2}>
                    {
                        this.state.equipments.map(equipments => {
                            return <EquipmentSmallView key={equipments._id} equipments={equipments} />
                        })
                    }

                </Grid>
            </Container>
        );
    }
}

export default EquipmentsContainer;