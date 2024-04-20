import { Component } from "react";
import * as Mui from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";

interface FormData {
  successMsg: boolean;
  showPassword: boolean;
  navigate: boolean;
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
  contact: Yup.string().required("*Contact is required"),
});

class RegistrationForm extends Component<{}, FormData> {
  state = {
    successMsg: false,
    showPassword: false,
    navigate: false,
  };

  handleClickShowPassword = () => {
    this.setState((prev) => ({ showPassword: !prev.showPassword }));
  };

  render() {
    const { successMsg, showPassword, navigate } = this.state;
    return (
      <Mui.Box sx={styles.Box}>
        <Mui.Typography variant="h3">SignUp</Mui.Typography>
        <br />
        {successMsg && (
          <Mui.Typography
            color={"green"}
            fontSize={18}
            data-testid="success-msg"
          >
            User successfully Registered
          </Mui.Typography>
        )}
        {navigate && <Navigate to={"/login"} />}

        <Formik
          data-testid="formik"
          initialValues={{ name: "", email: "", password: "", contact: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            this.setState({ successMsg: true });
            localStorage.setItem("user", JSON.stringify(values));
            values.contact = "";
            values.email = "";
            values.name = "";
            values.password = "";
            this.setState((prev) => ({ navigate: !prev.navigate }));
          }}
        >
          {(props) => (
            <Mui.Box
              component="form"
              onSubmit={props.handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Mui.TextField
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
              <Mui.TextField
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
              <Mui.TextField
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
                    <Mui.InputAdornment position="end">
                      <Mui.IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </Mui.IconButton>
                    </Mui.InputAdornment>
                  ),
                }}
              />

              <Mui.TextField
                label="Contact"
                name="contact"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                onFocus={props.handleBlur}
                value={props.values.contact}
                error={props.touched.contact && Boolean(props.errors.contact)}
                helperText={props.touched.contact && props.errors.contact}
                inputProps={{ "data-testid": "contact-input" }}
              />
              <Mui.Button
                variant="contained"
                type="submit"
                data-testid="Register"
              >
                Register
              </Mui.Button>
              <Mui.Typography sx={styles.TypographyText}>
                {" "}
                already have an Acount?{" "}
                <Link to={"/login"} style={styles.linkStyle}>
                  <Mui.Box component={"span"} data-testid="login-link">
                    {" "}
                    Login
                  </Mui.Box>
                </Link>
              </Mui.Typography>
            </Mui.Box>
          )}
        </Formik>
      </Mui.Box>
    );
  }
}

export default RegistrationForm;

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
