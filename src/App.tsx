import "./App.css";
import { Box } from "@mui/material";
import RoutingPage from "./Routes/config.routes";

function App() {
  return (
    <Box className="App" data-testid="App">
      <RoutingPage />
    </Box>
  );
}

export default App;
