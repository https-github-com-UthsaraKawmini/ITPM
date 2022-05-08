import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@material-ui/core';
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        marginLeft: 'auto',
    },
}));

export default function EquipmentSmallView(props) {
    const classes = useStyles();
    const equipment = props.equipment;

    return (
        <Grid item xs={3}>
            <Card className={classes.root} raised>
                <CardMedia
                    className={classes.media}
                    image={equipment.imageURL}
                />
                <CardContent>
                    <Typography variant="h6" color="primary" >{equipment.name}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {equipment.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="settings"
                        component={Link}
                        to={`/view-more-equipment/${equipment._id}`}
                    >
                        <AddShoppingCartIcon color={"primary"} />
                    </IconButton>
                    <Typography className={classes.expand} variant="h6" color="secondary" >
                        RS: {equipment.price}/-
                    </Typography>
                </CardActions>
            </Card>
        </Grid>
    );
}
