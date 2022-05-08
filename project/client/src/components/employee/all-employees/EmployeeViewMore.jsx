import React, { Component } from 'react';
import moment from 'moment';
import { Avatar, Card, Container, Divider, Grid, Typography } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";


const styles = (theme) => ({
    large: {
        width: theme.spacing(30),
        height: theme.spacing(30),
        marginTop: 10,
        [theme.breakpoints.up('md')]: {
            width: theme.spacing(45),
            height: theme.spacing(45),
            marginTop: 40,
        },
    },
    detailsCardStyle: {
        padding: 40,
    },
});

class EmployeeViewMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: this.props.employee,
        }
    }

    render() {
        const { classes } = this.props;
        const employee = this.state.employee;
        return (
            <React.Fragment>
                <Container>
                    <Card elevation={4} className={classes.detailsCardStyle}>
                        <Grid container justifyContent={"center"}>
                            <Grid item xs={12} sm={12} md={5}>
                                <Avatar src={employee.imageURL} className={classes.large} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={7}>

                                <Typography gutterBottom variant={"h5"} color={'textSecondary'}>Employee: {employee.name}</Typography>

                                <Divider style={{ marginBottom: 20 }} />


                                <Typography color={"inherit"} variant={"subtitle1"}>Email</Typography>
                                <Typography gutterBottom color={"textSecondary"}
                                    variant={"subtitle2"}>{employee.email}</Typography>

                                <Typography color={"inherit"} variant={"subtitle1"}>Mobile</Typography>
                                <Typography gutterBottom color={"textSecondary"}
                                    variant={"subtitle2"}>{employee.mobile}</Typography>

                                <Typography color={"inherit"} variant={"subtitle1"}>Gender</Typography>
                                <Typography gutterBottom color={"textSecondary"}
                                    variant={"subtitle2"}>{employee.gender}</Typography>

                                <Typography color={"inherit"} variant={"subtitle1"}>Birth Date</Typography>
                                <Typography gutterBottom color={"textSecondary"}
                                    variant={"subtitle2"}>{employee.birthDate}</Typography>

                                <Typography color={"inherit"} variant={"subtitle1"}>Join Date</Typography>
                                <Typography gutterBottom color={"textSecondary"}
                                    variant={"subtitle2"}>{moment(employee.birthDate).format('MMMM Do YYYY')}</Typography>

                                <Typography color={"inherit"} variant={"subtitle1"}>Salary</Typography>
                                <Typography gutterBottom color={"textSecondary"}
                                    variant={"subtitle2"}>Rs: {employee.salary}/-</Typography>

                            </Grid>
                        </Grid>
                    </Card>
                </Container>
            </React.Fragment >
        );
    }
}

export default withStyles(styles)(EmployeeViewMore)
