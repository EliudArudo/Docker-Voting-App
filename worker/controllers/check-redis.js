// const vote = {id:'sdfddsdfsfd, vote: 'cat'}
module.exports = function (redisClient, vote) {
    return new Promise((resolve, reject) => {

        // Check 'cat' or 'dog' id's collections
        redisClient.get(vote.vote).then(res => {

            const array = JSON.parse(res);

            if (array && array.includes(vode.id)) {
                return Promise.reject('You already voted');
            }

            return resolve(vote);

        }).catch(e => {
            return reject(e);
        })
    });
}