import React from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';
import PlotCard from './PlotCard';
import Plot from './model';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {

  const [plots, setPlots] = React.useState<Plot[]>([]);
  const [open, setOpen] = React.useState(true);
  const [message, setMessage] = React.useState("Plot booked");

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {

    fetch('http://localhost:8080/plots')
      .then(response => response.json())
      .then(data => setPlots(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Grid container spacing={1}>
        {plots.map((plot) => (
          <Grid key={plot.id} item xs={4} sm={2}>
            <PlotCard {...plot}></PlotCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
