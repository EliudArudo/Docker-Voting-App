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
redisClient.getall = util.promisify(redisClient.getall);

app.use(cors());
app.use(bodyParser.json());

app.post('/vote', checkBody, (req, res) => {

    resolver(redisClient, req.body).then(tally => {

        /// Send this tally to the Results server

        /// env.RESULTSSERVER should be a url, like 123.7.2.4

        axios({
            method: 'post',
            url: `${env.RESULTSSERVER}/votes-in`,
            data: tally
        }).then(response => {
            return res.send('OK');
        }).catch(e => {
            return res.status(500).send(e);
        });


    }).catch(e => {
        res.status(500).send(e);
    });



});


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})