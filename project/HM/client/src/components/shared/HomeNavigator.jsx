import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import logo from "../../assets/images/logo.jpg"

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        position: "relative",
    },
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
    title: {
        flexGrow: 1,
        display: 'none',
        marginLeft: 10,
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}));

const HomeNavigator = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const openUserImg = Boolean(anchorEl);

    const handleClose = (path) => {
        if (path === "profile") history.push("/profile");
        else {
            localStorage.removeItem("customer");
            history.push("/SignIn");
        }
        setAnchorEl(null);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const getButtons = () => (
        <React.Fragment>
            <Button component={Link} to="/" color="inherit">
                Foods
            </Button>
            <Button component={Link} to="/" color="inherit">
                Rooms
            </Button>
            <Button component={Link} to="/" color="inherit">
                Facilities
            </Button>
            <Button component={Link} to="/" color="inherit">
                About us
            </Button>
            <Button component={Link} to="/" color="inherit">
                Contact Us
            </Button>


        </React.Fragment>
    )


    const loginChecker = () => {
        if (localStorage.getItem("customer") != null) {
            return (
                <React.Fragment>
                    {getButtons()}
                    <Avatar
                        alt="Remy Sharp"
                        src={JSON.parse(localStorage.getItem("customer")).imageURL}
                        onClick={handleMenu}
                    />
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={openUserImg}
                        onClose={() => handleClose()}
                    >
                        <MenuItem onClick={() => handleClose("profile")}>My Profile</MenuItem>
                        <MenuItem onClick={() => handleClose("logout")}>Logout</MenuItem>
                    </Menu>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    {getButtons()}
                    <Button component={Link} to="/SignIn" color="inherit">
                        Sign In
                    </Button>
                </React.Fragment>
            );
        }
    };

    return (
        <React.Fragment>
            <AppBar
                position="static"
                color="default"
            >
                <Toolbar>
                    <Avatar
                        component={Link}
                        to="/"
                        alt="Logo"
                        src={logo}
                        className={classes.large}
                    />
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.title}
                        component={Link}
                        to="/"
                        style={{ textDecoration: "none" }}
                        noWrap
                    >
                        Sunset Lode
                    </Typography>
                    {loginChecker()}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default HomeNavigator;