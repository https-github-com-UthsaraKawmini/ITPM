import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        marginLeft: 'auto',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function AllEquipmentSalesSmallView(props) {
    const classes = useStyles();
    const equipments = props.equipments;

    return (
        <Grid item xs={4}>
            <Card className={classes.root} raised>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {equipments.name.charAt(0)}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={equipments.type}
                    subheader={equipments.country}
                />
                <CardMedia
                    className={classes.media}
                    image={equipments.imageURL}
                />
                 <CardContent>
                    <Typography variant="h6" color="primary" >{equipments.name}</Typography>
                    
                </CardContent>
                <CardActions disableSpacing>
                    <Typography className={classes.expand} variant="h5" color="secondary" >
                        Count: {equipments.SalesCount}/-
                    </Typography>
                </CardActions>
            </Card>
        </Grid>
    );
}
