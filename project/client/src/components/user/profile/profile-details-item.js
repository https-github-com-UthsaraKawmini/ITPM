import { Typography } from '@material-ui/core';
import React from 'react'

const ProfileDetailsItem = ({details}) => {
    return (
        <React.Fragment>
            <Typography color={"inherit"} variant={"subtitle1"}>{details.title}</Typography>
            <Typography gutterBottom variant={"subtitle2"} color={"textSecondary"} >{details.body}</Typography>
        </React.Fragment>
    )
}

export default ProfileDetailsItem;