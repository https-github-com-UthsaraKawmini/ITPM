import React from 'react'
import { Button, Card, CardMedia, Grid, Typography } from '@material-ui/core';
import topBanner from "../../assets/images/top-banner.jpg";

const TopBanner = () => {
    return (
        <Card raised>
            <CardMedia
                style={{
                    height: 0,
                    paddingTop: '46.25%'
                }}
                image={topBanner}
            />
        </Card>
    );
}

export default TopBanner;