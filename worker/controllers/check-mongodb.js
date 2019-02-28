const Vote = require('../models/vote');
const updateRedis = require('./update-redis');
// Vote should be {id, vote}
module.exports = function (redisClient, vote) {

    return new Promise((resolve, reject) => {
        // checking by id spreads to dogs and cats
        Vote.findOne({
            id: vote.id
        }).then(res => {
            if (!res) {
                // If not found, add it, then update redis
                return resolve(vote);
            }

            // If found, update redis
            updateRedis(redisClient, vote).then(() => {
                // Rejecting because vote already exists in our database
                // This was simply a redis update, that's it
                return reject('You already voted!!!');
            }).catch(e => {
                return reject(e);
            });


        }).catch(e => {
            console.log(e);
            return reject(e);
        });
    });
}