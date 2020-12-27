## This is frontend service for plot booking

Technology used

1. React JS
2. Typescript

Run below command to generate docker image for frontend service from root folder.

Below command fetches all the packages so it will take 5-10 mins for first time .

```
cd plot-booking-app
docker build -t plot-booking-app .
```

Above command builts image 'docker.io/library/plot-booking-app:latest'

Verify whether image has successfully built by below command:

```
docker images | grep plot-booking-app
```

**Note: Before running frontend service, make sure backend service is up and running**

Now to run this service execute below command:

```
docker run -d -p 3000:3000 --name plot-booking-app plot-booking-app:latest
```

To verify service is working properly execute below url in browser

```
http://localhost:3000
```

You should get below response

![plot-booking-app](plot-booking-app.png)

If you are using firebase hosting in production then below step is not required.

To use firebase and firebase authentication, create .env file in root folder(plot-booking-app) with below content to test things locally.

```
REACT_APP_API_KEY = "YOUR_PROJECT_API_KEY"
REACT_APP_AUTH_DOMAIN = "YOUR_PROJECT_AUTH_DOMAIN"
REACT_APP_DATABASE_URL = "YOUR_PROJECT_DATABASE_URL"
REACT_APP_PROJECT_ID = "YOUR_PROJECT_PROJECT_ID"
REACT_APP_STORAGE_BUCKET = "YOUR_PROJECT_STORAGE_BUCKET"
REACT_APP_MESSAGING_SENDER_ID = "YOUR_PROJECT_MESSAGING_SENDER_ID"
REACT_APP_APP_ID = "YOUR_PROJECT_APP_ID"
REACT_APP_MEASUREMENT_ID = "YOUR_PROJECT_MEASUREMENT_ID"
```

