const myId = "sdfljdfsfljnjlsnfljdfns";

const dog = document.getElementById('dog');
const cat = document.getElementById('cat');

function vote(vote, id) {

    /// Voter-Client - '/' :3000
    /// Results  - '/results' :4000
    /// Worker - :5000 '/api' - should be perfectly okay, for use with other interfaces

    fetch('/api/vote', {
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