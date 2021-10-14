import React from 'react';
import Grid from '@mui/material/Grid';
import PlotCard from './PlotCard';
import Plot, { Notification } from './model';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import db from './Firebase';
import { getApp } from 'firebase/app';
import {
  collection,
  query,
  onSnapshot,
  Query,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import {
  getFunctions,
  httpsCallable,
  HttpsCallableResult,
} from 'firebase/functions';
import { getMessaging, getToken } from 'firebase/messaging';

function getFCMToken() {
  const messaging = getMessaging();
  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  // Replace below YOUR_VAPID_KEY with your project specific vapidKey
  getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        const functions = getFunctions(getApp(), 'asia-south1');
        const subscribeToTopic = httpsCallable(functions, 'subscribeToTopic');
        subscribeToTopic({ token: currentToken }).then(
          (result: HttpsCallableResult<any>) => {
            // Read result of the Cloud Function.
            const successCount = result.data.successCount;
            console.log('Token successCount is: ', successCount);
          }
        );
      } else {
        // Show permission request UI
        console.log(
          'No registration token available. Request permission to generate one.'
        );
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
}

function App() {
  const [plots, setPlots] = React.useState<Plot[]>([]);
  const [notification, setNotification] = React.useState<Notification>({
    open: false,
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ open: false });
  };

  React.useEffect(() => {
    const q: Query<DocumentData> = query(collection(db, 'plots'));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const _plots: Plot[] = [];

        querySnapshot.forEach((doc) => {
          _plots.push({
            id: doc.id,
            status: doc.data().status,
            owner: doc.data().owner,
          });
        });
        setPlots(_plots);
      }
    );

    return () => unsubscribe();
  }, []);

  React.useEffect(() => getFCMToken(), []);

  return (
    <div>
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
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
