import signUpImg from "../../../assets/images/signup.jpg"
const styles = (theme) => ({

    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: `url(${signUpImg})`,
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
        width: theme.spacing(15),
        height: theme.spacing(15),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
});

export default styles;