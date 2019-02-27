const Vote = require('../models/vote');

module.exports = function (vote) {

    return new Promise((resolve, reject) => {

        new Vote(vote).save().then(data => {
            /// <ake sure we have clean data
            return resolve({
                id: data.id,
                vote: data.vote
            });
        }).catch(e => {
            return reject(e);
        });

    });

};