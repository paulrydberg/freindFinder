let friends = require('../API/friends.js');

module.exports = app => {
  app.get('/api/friends', (req, res) => {
    res.json(friends);
  });

  app.post('/api/friends', (req, res) => {
    let potentialFriend = req.body;
    let diff = [];

    friends.forEach(storedValue => {
      let totesDiff = 0;

      for (let i = 0; i < potentialFriend.answers.length; i++) {
        let previousAns = parseFloat(storedValue.answers[i]);
        let thisAns = parseFloat(potentialFriend.answers[i]);
        let currentDiff = previousAns - thisAns;
        if (currentDiff > 0) {
          totesDiff = totesDiff + currentDiff;
        } else {
          totesDiff = totesDiff + currentDiff * -1;
        }
      }

      diff.push(totesDiff);
    });

    let minDiff = Math.min.apply(Math, diff);
    let match = [];

    for (let i = 0; i < diff.length; i++) {
      if (diff[i] === minDiff) {
        match.push(friends[i]);
      }
    }

    res.json(match);
    friends.push(potentialFriend);
  });
};
