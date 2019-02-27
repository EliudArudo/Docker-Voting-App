const checkRedis = require('./check-redis');
const checkMongoDB = require('./check-mongodb');

const updateMongoDB = require('./update-mongodb');
const updateRedis = require('./update-redis');

module.exports = function (redisClient, vote) {
    return new Promise((resolve, reject) => {

        checkRedis(redisClient, vote).then(data => {
            /// Meaning data does not exist on redis
            checkMongoDB(redisClient, data).then(data2 => {
                /// Meaning vote is not in Redis, or Mongodb
                updateMongoDB(data2).then(data3 => {
                    // Successfully saved in db
                    // Get all the cats and dog values
                    updateRedis(redisClient, data3).then(data4 => {
                        // Successfully save in redis
                        return resolve(data4.tally);

                    }).catch(e => {
                        return reject(e);
                    });

                }).catch(e => {
                    // This is an error with mongodb
                    return reject(e);
                });

            }).catch(e => {
                // Should reject on mongo error, or
                // Update redis, then return 'You already voted'
                return reject(e);
            })
        }).catch(e => {
            // Should reject on error, or if someone voted already
            return reject(e);
        });
    });
}