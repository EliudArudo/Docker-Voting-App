const myId = "sdfljdfsfljnjlsnfljdfns";

const dog = document.getElementById('dog');
const cat = document.getElementById('cat');

const input = document.getElementById('vote-input');

function status(element, success) {
    const BACKGROUND = 'rgba(0, 0, 0, 0.1)';
    const SUCCESS_BACKGROUND = 'rgba(117, 235, 0, 0.1)';
    const FAIL_BACKGROUND = 'rgba( 255, 64, 46, 0.5)';

    let background;
    if (success) {
        background = SUCCESS_BACKGROUND;
    } else {
        background = FAIL_BACKGROUND;
    }

    element.style.background = background;
    input.value = null;

    setTimeout(() => {
        element.style.background = BACKGROUND;
    }, 1000);

}

function vote(vote, id) {

    /// Voter-Client - '/' :3000
    /// Results  - '/results' :4000
    /// Worker - :5000 '/api' - should be perfectly okay, for use with other interfaces
    axios({
        url: '/api/vote',
        method: 'post',
        data: {
            id,
            vote
        }
    }).then(res => {
        console.log(res.data);
        status(input, true);
    }).catch(e => {
        console.log(e.response);
        status(input, false);
    })
}

dog.addEventListener("click", () => {

    if (!input || input.value.trim() === "") {
        status(input, false);
        return;
    }

    vote('dog', input.value);
});

cat.addEventListener("click", () => {
    if (!input || input.value.trim() === "") {
        status(input, false);
        return;
    }
    vote('cat', input.value);
});