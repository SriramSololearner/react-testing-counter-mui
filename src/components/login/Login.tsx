import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import WithRouter from "../hoc/WithRouter";

interface FormData {
  successMsg: boolean;
  showPassword: boolean;
  errMsg: boolean;
  usrMsg: boolean;
}

interface Iprops {
  navigate: (value: string) => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("*Name is required"),
  email: Yup.string()
    .matches(
      /^[a-z0-9.!@#%^&*()]+@[a-z]+\.[a-z]{2,4}$/,
      "*Enter a valid email with (@, .)"
    )
    .email("*Invalid email")
    .required("*Email is required"),
  password: Yup.string()
    .min(8, "*Password must be at least 5 characters")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])\w+/,
      "*At least one uppercase and lowercase character"
    )
    .matches(/\d/, "*Password should contain at least one number")
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
      "*At least one special character"
    )
    .required("*Password is required"),
});

class Login extends Component<Iprops, FormData> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      successMsg: false,
      showPassword: false,

      errMsg: false,
      usrMsg: false,
    };
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { showPassword, usrMsg, errMsg } = this.state;
    return (
      <Box sx={styles.Box}>
        <Typography variant="h3"> Sign In</Typography>
        <br />
        {errMsg && (
          <Typography color={"red"} fontSize={18} data-testid="errMsg">
            Please check your username or password again!
          </Typography>
        )}

        <Formik
          initialValues={{ name: "", email: "", password: "", contact: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const usr = localStorage.getItem("user");

            if (usr) {
              const parsedData = JSON.parse(usr);
              const { email, password } = values;

              const isCredentialsMatch =
                parsedData.email === email && parsedData.password === password;

              this.setState({
                successMsg: isCredentialsMatch,
                errMsg: !isCredentialsMatch,
              });

              if (isCredentialsMatch) {
                this.props.navigate("/home");
              }
            } else {
              this.setState({ usrMsg: true });
            }
          }}
        >
          {(props) => (
            <Box
              component="form"
              onSubmit={props.handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Name"
                name="name"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                onFocus={props.handleBlur}
                value={props.values.name}
                error={props.touched.name && Boolean(props.errors.name)}
                helperText={props.touched.name && props.errors.name}
                inputProps={{ "data-testid": "name-input" }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                onFocus={props.handleBlur}
                value={props.values.email}
                error={props.touched.email && Boolean(props.errors.email)}
                helperText={props.touched.email && props.errors.email}
                inputProps={{ "data-testid": "email-input" }}
              />
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                onFocus={props.handleBlur}
                value={props.values.password}
                error={props.touched.password && Boolean(props.errors.password)}
                helperText={props.touched.password && props.errors.password}
                inputProps={{ "data-testid": "password-input" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button variant="contained" type="submit" data-testid="Login">
                Login
              </Button>
              <Typography sx={styles.TypographyText}>
                {" "}
                if you don't have an Acount?{" "}
                <Link to={"/"} style={styles.linkStyle}>
                  <Box component={"span"}> Register</Box>
                </Link>
              </Typography>
            </Box>
          )}
        </Formik>
        {usrMsg && (
          <Typography color={"red"} fontSize={18} data-testid="success-msg">
            user not found please check your Details or register yourself!
          </Typography>
        )}
      </Box>
    );
  }
}

export default WithRouter(Login);

const styles = {
  Box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  linkStyle: {
    textDecoration: "none",
  },
  TypographyText: {
    fontSize: "15px",
    fontWeight: 600,
    span: {
      color: "red",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
};
