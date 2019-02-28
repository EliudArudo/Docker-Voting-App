module.exports = function (redisClient, vote) {
    return new Promise(async (resolve, reject) => {

        try {
            // Gets JSON stringified array of 'ids'
            let res = await redisClient.get(vote.vote);

            console.log('Res from update Redis', res);

            res = JSON.parse(res);
            if (!res) {
                res = [];
            }

            // Push id
            res.push(vote.id);

            await redisClient.set(vote.vote, JSON.stringify(res));

            let dogs = await redisClient.get('dog'),
                cats = await redisClient.get('cat');

            dogs = JSON.parse(dogs),
                cats = JSON.parse(cats);


            if (!dogs) {
                dogs = [];
            } else if (!cats) {
                cats = [];
            }

            return resolve({
                vote,
                tally: {
                    dogs: dogs.length,
                    cats: cats.length
                }
            });

        } catch (e) {
            return reject(e);
        }

    });
}