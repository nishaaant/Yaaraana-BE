# Yaaraana ~ Nishant

Created the app named "Yaarana" .. This is the Backend microservice repository for that

## Idea
- To make an app for sending and accepting requests to fellow users and make "Yaaraana" with them
- Trying to strengthen my backend concepts

## Tools and Libraries
- Expressjs - to manage APIs , created expressRouter too for a readable code
- Mongoose - MongoDB - created a cluster on mongoDB Atlas and managing it on MongoDB Compass locally
- Postman - to test the response of APIs instead of my Browser
- validator - for validating email, password
- jswebtoken - to manage token for user login methods
- cookie-parser to convert into JSON so that it wont give undefined error
- bcrypt - to encrypt the password of user for privacy purpose

## Listing APIS

### authRoutes
- POST /signup ✅
- POST /login ✅
- POST /logout ✅

### profileRoutes
- GET /profile/view ✅
- PATCH /profile/edit ✅
- PATCH /profile/editPassword ✅

### requestRoutes
- POST /request/send/:status/:userId  ~ status {like,ignore} ✅
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

### userRoutes
- GET /user/connections
- GET /user/requests
- GET /user/feed