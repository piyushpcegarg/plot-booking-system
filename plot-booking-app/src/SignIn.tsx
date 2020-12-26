import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontStyle: 'italic',
  },
}));

function SignIn() {

  const classes = useStyles();

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow if you want to speed up the loading process
    // Replace 'redirect' with 'popup' for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'redirect',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        /* scopes: [
          'https://www.googleapis.com/auth/contacts.readonly'
        ], */
        customParameters: {
          // Forces account selection even when one account
          // is available.
          prompt: 'select_account'
        }
      },
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          size: 'invisible'
        },
        defaultCountry: 'IN', // Set default country to the India (+91).
        whitelistedCountries: ['IN'],
      }
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} align="center">
            Plot Booking System
          </Typography>
        </Toolbar>
      </AppBar>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignIn;