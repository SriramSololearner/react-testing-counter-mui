export const Styles = {
    main: {
        width: "100%",
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    nav: {
        background: 'blue',
        height: "8vh",
        color: "white",
        display: "flex", justifyContent: 'space-between',
        alignItems: 'center',
        pl: 5, pr: 5,
        "&:hover": {
            background: '#5468ff',
            transition: "1s ease-in-out"
        }
    },
    logout: {
        cursor: "pointer"
    },

    cardContainer: {
        width: "250px",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxShadow: "0px 2px 5px"
    },
    usrImg: {
        width: "100%",
        height: "100%",
    },
    imgContainer: {
        width: "200px",
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
        textTransform: "capitalize",
        background: "blue",
        "&:hover": {
            background: "blue"
        }
    },
    profile1: { width: "80px", height: "80px" },
    profile2: { width: "100px", height: "100px" },
    saveBtn: {
        textDecoration: "underline",
        fontSize: "16px",
        fontWeight: 600,
        color: "blue",
        height: 40,
        "&:hover": {
            background: "none",
            color: "red",
            textDecoration: "underline",
        }
    }

}