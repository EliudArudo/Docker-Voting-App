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

const mockdata = {
    dogs: 50,
    cats: 50
};

io.on('connection', (socket) => {
    // Get current values and send, then set up listener
    socket.emit('update-votes', mockdata);
});

app.post('/votes-in', (req, res) => {
    const updatedVotes = req.body.votes;
    // emit updatedVotes
    res.send('OK');
    io.sockets.emit('update-votes', {
        dogs: mockdata.dogs + 1,
        cats: mockdata.cats - 1
    });
    mockdata.dogs++;
    mockdata.cats--;
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});