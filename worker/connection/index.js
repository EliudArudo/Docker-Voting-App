const mongoose = require('mongoose');
const env = require('../env');

const mongoURI = `mongodb://${env.MONGOURI}:${env.MONGOPORT}/${env.MONGODATABASE}`;

mongoose.Promise = global.Promise;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    reconnectTries: 10,
    reconnectInterval: 1000
}, (err, db) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Mongodb connected');
});