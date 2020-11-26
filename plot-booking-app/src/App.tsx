import React from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';
import PlotCard from './PlotCard';
import Plot, { Notification } from './model';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function App() {

  const [plots, setPlots] = React.useState<Plot[]>([]);
  const [notification, setNotification] = React.useState<Notification>({
    open: false
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({open: false});
  };

  React.useEffect(() => {

    fetch('http://localhost:8080/plots')
      .then(response => response.json())
      .then(data => setPlots(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [notification]);

  return (
    <div>
      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
      <Grid container spacing={1}>
        {plots.map((plot) => (
          <Grid key={plot.id} item xs={4} sm={2}>
            <PlotCard plot={plot} setNotification={setNotification}></PlotCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
