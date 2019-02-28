// const vote = {id:'sdfddsdfsfd, vote: 'cat'}
module.exports = function (redisClient, vote) {
    return new Promise(async (resolve, reject) => {

        try { // Check both ways my guy

            let dogs = await redisClient.get('dog'),
                cats = await redisClient.get('cat');
            dogs = JSON.parse(dogs),
                cats = JSON.parse(cats);

            if ((dogs && dogs.includes(vote.id)) || (cats && cats.includes(vote.id))) {
                return reject('You already voted');
            }

            return resolve(vote);

        } catch (e) {
            return reject(e);
        }
    });
}