const functions = require('firebase-functions');
const FBAuth = require('./util/FBAuth')
const app = require('express')();

const cors = require('cors');
app.use(cors());

const { getAllChallenges, postOneChallenge, getChallenge } = require('./handlers/challenges');
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users');

//Users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

//Challenges routes
app.get('/challenges', getAllChallenges);
app.post('/challenge', FBAuth, postOneChallenge);
app.get('/challenge/:challengeId', getChallenge);

exports.api = functions.https.onRequest(app);