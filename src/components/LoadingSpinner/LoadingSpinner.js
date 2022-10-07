import { Grid,CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "60vh", padding: "10px"}}
    >
      <CircularProgress />
    </Grid>
  );
};

export default LoadingSpinner;

