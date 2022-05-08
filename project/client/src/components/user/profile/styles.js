import { green } from '@material-ui/core/colors';

const styles = (theme) => ({
    container: {
        marginTop: 40
    },
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
        marginBottom: 50
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    update: {
        marginRight: 20,
        background: green[700],
        color: "#ffffff",
        '&:hover': {
            background: green[800],
        },
    }
});

export default styles;