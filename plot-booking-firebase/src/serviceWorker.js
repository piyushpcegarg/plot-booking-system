const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('firebase-messaging-sw.js')
      .then((registration) => {
        console.log(
          'Service worker registration successful, scope is: ',
          registration.scope
        );
        return registration.scope;
      })
      .catch((err) => {
        console.log('Service worker registration failed, error:', err);
        return err;
      });
  }
};

export default registerServiceWorker;
