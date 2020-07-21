const functions = require('firebase-functions');
const FBAuth = require('./util/FBAuth')
const app = require('express')();

const cors = require('cors')({ origin: true });
app.use(cors());

const { getAllChallenges, postOneChallenge, getChallenge, updateChallenge, updateStar, updateTime } = require('./handlers/challenges');
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser, addFriend, getFriend, updateCompleted } = require('./handlers/users');

//Users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.put('/user', FBAuth, addFriend);
app.get('/user/:friendUid', FBAuth, getFriend);
app.put('/user/:handle', FBAuth, updateCompleted);

//Challenges routes
app.get('/challenges', getAllChallenges);
app.post('/challenge', FBAuth, postOneChallenge);
app.get('/challenge/:challengeId', getChallenge);
app.put('/challenge/:challengeId', updateChallenge);
app.put('/challenge/:challengeId/star', updateStar);
app.put('/challenge/:challengeId/time', updateTime);

exports.api = functions.https.onRequest(app);