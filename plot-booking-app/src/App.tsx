import React from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';
import PlotCard from './PlotCard';
import Plot, { Notification } from './model';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontStyle: 'italic',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const signOut = () => {
  firebase.auth().signOut().then(() => console.log('User has logged out successfully.'));
};

function App() {

  const classes = useStyles();
  const [plots, setPlots] = React.useState<Plot[]>([]);
  const [notification, setNotification] = React.useState<Notification>({
    open: false
  });
  const accessTokenRef = React.useRef('');

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({open: false});
  };

  React.useEffect(() => {

    firebase.auth().currentUser?.getIdToken().then((token: string) => {
      
      accessTokenRef.current = token;

      fetch('http://localhost:8080/plots/', {
        headers: {
          'Authorization': 'Bearer ' + accessTokenRef.current
        }
      })
      .then(response => response.json())
      .then(data => setPlots(data))
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  }, []);

  React.useEffect(() => {

    const eventSource = new EventSource('http://localhost:8080/plots/events'); 
    eventSource.onopen = (event: any) => console.log('open', event); 
    eventSource.onmessage = (event: any) => {
      setPlots(JSON.parse(event.data));
    };
    eventSource.onerror = (event: any) => console.log('error', event);

  }, []);

  return (
    <div className={classes.root}>
      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} align="center">
            Plot Booking System
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            className={classes.button}
            onClick={signOut}
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={1}>
        {plots.map((plot) => (
          <Grid key={plot.id} item xs={4} sm={2}>
            <PlotCard plot={plot} setNotification={setNotification} accessToken={accessTokenRef.current}></PlotCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
