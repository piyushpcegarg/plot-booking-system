import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const subscribeToTopic = functions.region('asia-south1').https
  .onCall((data, context) => {
    // Token passed from the client.
    const token = data.token;
    return admin.messaging().subscribeToTopic(token, 'push_notification');
  });

export const sendNotification = functions.region('asia-south1').firestore
  .document('/plots/{plotId}')
  .onUpdate((change, context) => {
    const plotId = context.params.plotId;
    const newPlotValue = change.after.data();

    const owner = newPlotValue.owner;
    const title = 'Plot ' + plotId + ' booked.';
    const body = owner + ' has booked plot ' + plotId;

    // Create a notification
    const payload = {
      notification: {
        title: title,
        body: body,
        sound: 'default',
      },
    };

    // Create an options object that contains the time to live
    // for the notification and the priority
    const options = {
      priority: 'high',
      timeToLive: 60 * 60 * 24,
    };

    return admin.messaging().sendToTopic('push_notification', payload, options);
  });
