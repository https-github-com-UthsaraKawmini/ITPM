import signInImg from "../../../assets/images/signin.jpg"

const styles = (theme) => ({

    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: `url(${signInImg})`,
        backgroundSize: "cover",
    },
    paper: {
        margin: theme.spacing(4, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(3),
    },
    submit: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    form: {
        marginTop: 10
    }
});

export default styles;