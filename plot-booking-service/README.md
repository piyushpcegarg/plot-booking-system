## This is backend service for plot booking

Technology used

1. Spring Boot
2. H2
3. Docker
4. Kubernetes
5. TLS

Run below command to generate docker image for backend service from root folder.

Below command fetches all the libraries so it will take 5-10 mins for first time .

```
cd plot-booking-service
./gradlew bootBuildImage
```

Above command builts image 'docker.io/library/plot-booking-service:1.0.0'

Verify whether image has successfully built by below command:

```
docker images | grep plot-booking-service
```

Now to run this service execute below command:

```
docker run -d -p 8080:8080 --name plot-booking-service plot-booking-service:1.0.0
```

To verify service is working properly execute below url in browser

```
http://localhost:8080/plots
```

API should return response

To deploy backend service on kubernetes cluster use plot-booking.yaml file given in k8s-manifests folder

As TLS is enabled on ingress, please follow below instructions to create secret.

Create self signed key and certificate using below command

```
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=api.yourdomain.com/O=api.yourdomain.com"
```

Above command creates tls.key and tls.crt file

Now to enable TLS for ingress, tls secret needs to be created on k8s cluster

1. Using command line
```
kubectl create secret tls plot-booking-tls --key tls.key --cert tls.crt
```

The resulting secret will be of type kubernetes.io/tls

2. Second option is to get base64 encoded cert and base64 encoded key. Then replace in plot-booking.yaml

```
cat tls.crt | base64
cat tls.key | base64
```
