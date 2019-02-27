const myId = "sdfljdfsfljnjlsnfljdfns";

const dog = document.getElementById('dog');
const cat = document.getElementById('cat');

function vote(vote, id) {
    fetch('/worker/vote', {
        method: "POST",
        body: JSON.stringify({
            id,
            vote
        })
    }).then(res => {
        console.log(res);
    }).catch(e => {
        console.log(e);
    })
}

dog.addEventListener("click", () => {
    vote('dog', myId);
});

cat.addEventListener("click", () => {
    vote('cat', myId);
});