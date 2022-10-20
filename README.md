# webapp
#webapp

Built a service that will accept following HTTP request at

GET - http://localhost:8080/healthz/

POST - http://localhost:8080/v1/account/

PUT - http://localhost:8080/v1/account/{accountId}

GET - http://localhost:8080/v1/account/{accountId}


# Responds with following HTTP messages

"400 Bad Request - The server could not understand the request due to invalid syntax."

"500 Internal Server Error - The server has encountered a situation it does not know how to handle."

"201 Created - The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests"

"200 OK - The request succeeded."

"401 Unauthorized - Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response."

"204 No Content - The HTTP 204 No Content success status response code indicates that a request has succeeded, but that the client doesn't need to navigate away from its current page."

#What you Need

IDE (VScode)

POSTMAN

MySQL

npm

JavaScript

#Instructions:

Step 1: Download and unzip the source repository for this guide, or clone it using Git.

Step 2: Create appropriate files in the IDE and write the code to test the API call in Postman.

Step 3: Open Postman and Test the API's

Step 4: Check the Database after each and every API is called to see the status in Database.

Test the Service
To check the service is up visit

http://localhost:8080/healthz/, where you should see: "200 OK".

http://localhost:8080/v1/user/ where you should see: "201 Created".

http://localhost:8080/v1/user/self/ where you should see: "204 No Content".

http://localhost:8080/v1/user/self where you should use: "204 No Content".

#Important Commands
```
brew install mysql
```
```
npm start
```
```
npm test
```

Packer

Update Packer
```
packer validate base_ami.json
```

Build Packer
```
packer build base_ami.json
```