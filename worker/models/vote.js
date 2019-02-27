const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    id: String,
    vote: {
        type: String,
        enum: ['dog', 'cat']
    }
});

module.exports = mongoose.model('vote', voteSchema);