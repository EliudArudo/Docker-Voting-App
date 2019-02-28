const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

const port = 4000;
const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.json());
app.use(express.static(publicPath));

// Started value
let mockdata = {
    dogs: 50, // 0
    cats: 50 // 0
};

io.on('connection', (socket) => {
    // Get current values and send, then set up listener
    
    socket.emit('update-votes', mockdata);

    socket.on('disconnect', () => {
      console.log(`Connection left`);
    })
});

app.post('/votes-in', (req, res) => {
    const updatedVotes = {
        dogs: req.body.dogs,
        cats:req.body.cats
    }; /// body should have only '{dogs: 30, cats: 30}'
    // emit updatedVotes
    res.send('OK');

    const dogs = 100 * ((updatedVotes.dogs) / (updatedVotes.cats + updatedVotes.dogs));
    const cats = 100 * ((updatedVotes.cats) / (updatedVotes.cats + updatedVotes.dogs));

    mockdata = {
        dogs,
        cats
    };

    io.sockets.emit('update-votes', mockdata);
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});