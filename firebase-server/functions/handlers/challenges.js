const { db } = require('../util/admin.js');
//Get all challenges
exports.getAllChallenges = (req, res) => {
    db.collection('challenges').orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let challenges = [];
            data.forEach((doc) => {
                challenges.push({
                    challengeId: doc.id,
                    name: doc.data().name,
                    goal: doc.data().goal,
                    description: doc.data().description,
                    handle: doc.data().handle,
                    current: doc.data().current,
                    participants: doc.data().participants,
                    createdAt: doc.data().createdAt
                });
            });
            return res.json(challenges);
        })
        .catch(err => console.error(err));
}

//Post one challenge
exports.postOneChallenge = (req, res) => {
    const newChallenge = {
        name: req.body.name,
        goal: req.body.goal,
        description: req.body.description,
        handle: req.body.handle,
        current: req.body.current,
        participants: req.body.participants,
        createdAt: new Date().toISOString()
    };

    db
        .collection('challenges')
        .add(newChallenge)
        .then((doc) => {
            const resChallenge = newChallenge;
            resChallenge.challengeId = doc.id;
            res.json(resChallenge);
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(err);
        })
}

//Get one challenge
exports.getChallenge = (req, res) => {
    let challengeData = {};
    db.doc(`/challenges/${req.params.challengeId}`).get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Challenge not found' })
            }
            challengeData = doc.data();
            challengeData.challengeId = doc.id;
            return res.json(challengeData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

//Update challenge
exports.updateChallenge = (req, res) => {
    // let challengeData = {};
    var name = req.body.name;
    var newValue = req.body.newValue;
    // console.log(req.params.challengeId, 'challengeid')
    db.collection('challenges').doc(req.params.challengeId).update({ current: newValue })
        .then(() => {
            return res.json(newValue)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.code });
        })
}