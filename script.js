// Variables for Target
const jokeContainer = document.getElementById("joke-container");
const joke1Text = document.getElementById("joke1");
const joke2Text = document.getElementById("joke2");
const jokeType = document.getElementById("joke-type");
const wpBtn = document.getElementById("whatsapp");
const newJokeBtn = document.getElementById("new");

// Get Joke from API
async function getJoke() {
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any?type=twopart';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Reduce Font Size for Long Joke
        if(data.setup.length+data.delivery.length>80) {
            joke1Text.classList.add('long-joke');
            joke2Text.classList.add('long-joke');
        }
        else {
            joke1Text.classList.remove('long-joke');
            joke2Text.classList.remove('long-joke');
        }
        joke1Text.innerText = `Abby : ${data.setup}`;
        joke2Text.innerText = `Gabby : ${data.delivery}`;
        jokeType.innerText = `Category: ${data.category}`;
    } catch (error) {
       console.log(`Error Reported: ${error}`); 
    }
}

function shareOnWp() {
    const joke = `${joke1Text.innerText}\n
    ${joke2Text.innerText}`;
    const wpUrl = `whatsapp://send?text=${joke}`;
    window.open(wpUrl, '_blank');
}

// Event Listeners
newJokeBtn.addEventListener('click', getJoke);
wpBtn.addEventListener('click', shareOnWp);

getJoke();