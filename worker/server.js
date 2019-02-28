const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('util');

const axios = require('axios');

const env = require('./env');

const port = 5000;

const app = express();

require('./connection');

const resolver = require('./controllers/resolver');
const checkBody = require('./middlewares/check-body');

const redisClient = redis.createClient({
    host: env.REDISHOST,
    port: env.REDISPORT,
    retry_strategy: () => 1000
});

redisClient.get = util.promisify(redisClient.get);

app.use(cors());
app.use(bodyParser.json());

app.post('/vote', checkBody, (req, res) => {

    const vote = {
        id: req.body.id,
        vote: req.body.vote
    }

    console.log('Vote just came in', vote);

    resolver(redisClient, vote).then(tally => {

        /// Send this tally to the Results server

        /// env.RESULTSSERVER should be a url, like 123.7.2.4

        axios({
            method: 'post',
            url: `results://${env.RESULTSSERVER}:4000/votes-in`,
            data: tally
        }).then(response => {
            return res.send('OK');
        }).catch(e => {
            console.log(e);
            return res.status(500).send('Please try again later');
        });


    }).catch(e => {
        res.status(500).send(e);
    });



});


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})