import { Box, Card, CardContent, Typography } from "@mui/material";
import { Component } from "react";

interface Istate {
  UserData: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
  }[];
  loading: boolean;
  error: null | string;
}

export default class DisplayUserData extends Component<{}, Istate> {
  constructor(props: {}) {
    super(props);
    this.state = {
      UserData: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount(): void {
    this.fetchCall();
  }

  fetchCall = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      this.setState({ UserData: data.users, loading: false });
    } catch (err) {
      this.setState({ error: "not found!" });
    }
  };

  render() {
    const { UserData, error } = this.state;

    return (
      <Box sx={styles.mainContainer}>
        <Box sx={styles.innerContainer}>
          {error ? (
            <Typography data-testid="err-msg">{error}</Typography>
          ) : (
            UserData.map((obj) => (
              <Card sx={styles.cardContainer} key={obj.id}>
                <Box sx={styles.imgContainer}>
                  <Box
                    component={"img"}
                    src={obj.image}
                    sx={styles.usrImg}
                    alt="user-profile"
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
                    {obj.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    data-testid={"user-name"}
                  >
                    {obj.firstName + obj.lastName}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Box>
    );
  }
}

const styles = {
  mainContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "80%",
    height: "100vh",
    display: "flex",

    gap: 5,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: "250px",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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
};
