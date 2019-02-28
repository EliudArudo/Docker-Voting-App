const socket = io();

let dogPercentage = 50;
let catPercentage = 50;

function changePercentages(dog_votes, cat_votes) {
    const dogs = document.getElementById('dog');
    const cats = document.getElementById('cat');

    dogs.style.width = `${dog_votes}%`;
    cats.style.width = `${cat_votes}%`;

    console.log('Dogs got ', dogs.style.width);
    console.log('Cats got ', cats.style.width)
}

changePercentages(dogPercentage, catPercentage);

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('update-votes', function (votes) {
    changePercentages(votes.dogs, votes.cats);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});