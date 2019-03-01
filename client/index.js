const myId = 'sdfljdfsfljnjlsnfljdfns';

const dog = document.getElementById('dog');
const cat = document.getElementById('cat');

const input = document.getElementById('vote-input');

const messageElement = document.getElementById('status-message');

function status(element, success, message) {
    const BACKGROUND = 'rgba(0, 0, 0, 0.1)';
    const SUCCESS_BACKGROUND = 'rgba(117, 235, 0, 0.1)';
    const FAIL_BACKGROUND = 'rgba( 255, 64, 46, 0.5)';

    let background,
        Class;
    if (success) {
        Class = 'success';
        background = SUCCESS_BACKGROUND;
    } else {
        Class = 'error';
        background = FAIL_BACKGROUND;
    }
    messageElement.classList.add(Class);

    element.style.background = background;
    input.value = null;
    messageElement.innerText = message;

    setTimeout(() => {
        messageElement.classList.remove(Class);
        element.style.background = BACKGROUND;
        messageElement.innerText = null;
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
        })
        .then((res) => {
            console.log(res);
            if (res.data.length === 0) {
                return status(input, true, 'Sorry, please try again later');
            }
            status(input, true, res.data);
        })
        .catch((e) => {
            console.log(e.response);
            if (e.response.data.length === 0) {
                return status(input, false, "Sorry, we're experiencing some issues");
            }

            status(input, false, e.response.data);
        });
}

dog.addEventListener('click', () => {
    if (!input || input.value.trim() === '') {
        status(input, false, 'Please enter your id');
        return;
    }

    vote('dog', input.value);
});

cat.addEventListener('click', () => {
    if (!input || input.value.trim() === '') {
        status(input, false, 'Please enter your id');
        return;
    }
    vote('cat', input.value);
});