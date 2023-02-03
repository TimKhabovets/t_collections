import { BrowserRouter } from "react-router-dom";
import Grid from "@mui/material/Grid";
import AppRoutes from "./common/routes/AppRoutes";
import Navbar from "./common/navbar/Navbar";

function App() {

  return (
    <BrowserRouter>
        <Grid container direction="column">
          <Navbar />
          <AppRoutes />
        </Grid>
    </BrowserRouter>
  );
}

export default App;
