import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, Component, SyntheticEvent } from "react";
import { Styles } from "./styles";
import WithRouter from "../hoc/WithRouter";

interface Istate {
  open: boolean;
  url: string;
  userDetails: {
    name: string;
    email: string;
    password: string;
    contact: string;
    imgUrl: string;
  };
}

interface Iprops {
  navigate: (value: string) => void;
}
class HomePage extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      open: false,
      url: "/static/images/avatar/1.jpg",
      userDetails: {
        name: "",
        email: "",
        password: "",
        contact: "",
        imgUrl: "",
      },
    };
  }

  componentDidMount() {
    const userData = localStorage.getItem("user");

    if (userData) {
      this.setState({ userDetails: JSON.parse(userData) });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handlerUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const url = event.target.files![0];
    const imgUrl = URL.createObjectURL(url);
    this.setState((prevState) => ({
      userDetails: {
        ...prevState.userDetails,
        imgUrl: imgUrl, // Update the imgUrl in userDetails
      },
    }));
  };

  handlerLogout = () => {
    this.props.navigate("/login");
    localStorage.removeItem("user");
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    this.setState((prevState) => ({
      userDetails: {
        ...prevState.userDetails,
        [name]: value,
      },
    }));
  };

  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const { userDetails } = this.state;
    this.setState({ open: false });
    localStorage.setItem("user", JSON.stringify(userDetails));
  };

  render() {
    const { open, userDetails } = this.state;

    return (
      <Box data-testid="profile">
        <Box sx={Styles.nav}>
          <Typography>Home</Typography>
          <Typography onClick={this.handlerLogout} sx={Styles.logout}>
            Logout
          </Typography>
        </Box>
        <Box sx={Styles.main} data-testid="main">
          <Card sx={Styles.cardContainer}>
            <Box>
              <Avatar
                alt="user name"
                src={userDetails.imgUrl}
                sx={Styles.profile2}
              />
            </Box>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontSize={18}
                data-testid={"user-email"}
              >
                {userDetails.email}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                data-testid={"user-name"}
              >
                {userDetails.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                sx={Styles.btn}
                onClick={this.handleOpen}
              >
                Edit Profile
              </Button>
            </CardActions>
          </Card>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            data-testid="modal"
          >
            <Box sx={style}>
              <Stack
                direction={"column"}
                gap={2}
                component={"form"}
                onSubmit={this.handleSubmit}
              >
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box
                    component={"label"}
                    htmlFor="file"
                    data-testid="upload photo"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={userDetails.imgUrl}
                      sx={Styles.profile1}
                      data-testid=""
                    />
                  </Box>
                  <Button sx={Styles.saveBtn} type="submit">
                    Save
                  </Button>
                </Stack>
                <TextField
                  placeholder="Email"
                  name="email"
                  defaultValue={userDetails.email}
                  onChange={this.handleChange}
                />
                <TextField
                  placeholder="Name"
                  name="name"
                  defaultValue={userDetails.name}
                  onChange={this.handleChange}
                />
                <TextField
                  placeholder="Mobile"
                  name="contact"
                  defaultValue={userDetails.contact}
                  onChange={this.handleChange}
                />
                <Box
                  component={"input"}
                  type="file"
                  id="file"
                  data-testid="inputFile"
                  sx={{ display: "none" }}
                  onChange={this.handlerUpload}
                />
              </Stack>
            </Box>
          </Modal>
        </Box>
      </Box>
    );
  }
}
export default WithRouter(HomePage);

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
