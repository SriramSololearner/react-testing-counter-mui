import { Box, Button, Stack } from "@mui/material";
import { Component } from "react";
import { styles } from "./styles";

interface Istate {
  count: number;
}

export default class Counter extends Component<{}, Istate> {
  constructor(props: {}) {
    super(props);
    this.state = { count: 0 };
  }

  handlerDec = () => {
    if (this.state.count > 0) {
      this.setState((prev: Istate) => ({
        count: prev.count - 1,
      }));
    }
  };

  handlerInc = () => {
    this.setState((prev: Istate) => ({
      count: prev.count + 1,
    }));
  };

  handlerReset = () => {
    this.setState({ count: 0 });
  };

  render() {
    return (
      <Stack
        data-testid="counter-root"
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
      >
        <Box sx={styles.counterTxt} data-testid="count-label">
          count : {this.state.count}
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={styles.btn}
            onClick={this.handlerDec}
            data-testid="decrement"
          >
            Decrement
          </Button>
          <Button
            variant="contained"
            sx={styles.btn}
            onClick={this.handlerInc}
            data-testid="increment"
          >
            Increment
          </Button>
          <Button
            variant="contained"
            sx={styles.btn}
            onClick={this.handlerReset}
            data-testid="reset"
            disabled={this.state.count === 0}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    );
  }
}
