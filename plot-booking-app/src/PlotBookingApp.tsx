import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import App from './App';
import SignIn from './SignIn';

function PlotBookingApp() {

  const [user] = useAuthState(firebase.auth());

  if (!user) {
    return <SignIn />
  } else {
    return <App />
  }
}

export default PlotBookingApp;