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
