const { db } = require('../util/admin.js');

exports.getAllChallenges = (req, res) => {
    db.collection('challenges').get()
        .then(data => {
            let challenges = [];
            data.forEach((doc) => {
                challenges.push({
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                });
            });
            return res.json(challenges);
        })
        .catch(err => console.error(err));
}

exports.postOneChallenge = (req, res) => {
    const newChallenge = {
        body: req.body.body,
        userHandle: req.user.handle,
        createdAt: new Date().toISOString()
    };

    db
        .collection('challenges')
        .add(newChallenge)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully` })
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(err);
        })
}