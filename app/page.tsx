import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Forms from './components/Forms';

const Home = () => {
  return (
    <Box component="main" sx={{ padding: 4, textAlign: "center" }}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h2" component="h2">
          Pantry Tracker
        </Typography>
        <Forms />
      </Box>
    </Box>
  );
};

export default Home;
