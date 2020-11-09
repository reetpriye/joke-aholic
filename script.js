// Variables for Target
const jokeContainer = document.getElementById("joke-container");
const joke1Text = document.getElementById("joke1");
const joke2Text = document.getElementById("joke2");
const jokeType = document.getElementById("joke-type");
const wpBtn = document.getElementById("whatsapp");
const newJokeBtn = document.getElementById("new");
const loader = document.getElementById("loader");
const jokeArrow1 = document.getElementById("joke-arrow-right-1");
const jokeArrow2 = document.getElementById("joke-arrow-right-2");

function showLoader() {
    loader.hidden = false;
    jokeContainer.hidden = true;
}

function hideLoader() {
    if(!loader.hidden) {
        loader.hidden = true;
        jokeContainer.hidden = false;
    }
}

// Get Joke from API
async function getJoke() {
    showLoader();
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any?type=twopart';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Reduce Font Size for Long Joke
        if(data.setup.length+data.delivery.length>80) {
            joke1Text.classList.add('long-joke');
            joke2Text.classList.add('long-joke');
            jokeArrow1.classList.add('long-joke-arrow-right');
            jokeArrow2.classList.add('long-joke-arrow-right');
        }
        else {
            joke1Text.classList.remove('long-joke');
            joke2Text.classList.remove('long-joke');
            jokeArrow1.classList.remove('long-joke-arrow-right');
            jokeArrow2.classList.remove('long-joke-arrow-right');
        }
        joke1Text.innerText = `Abby : ${data.setup}`;
        joke2Text.innerText = `Gabby : ${data.delivery}`;
        jokeType.innerText = `Category: ${data.category}`;
    } catch (error) {
       console.log(`Error Reported: ${error}`); 
    }
    hideLoader();
}

function shareOnWp() {
    const joke = `${joke1Text.innerText}%0a${joke2Text.innerText}%0a~Find more at *https://jokeaholic.netlify.app*~`;
    const wpUrl = `whatsapp://send?text=${joke}`;
    window.open(wpUrl, '_blank');
}

// Event Listeners
newJokeBtn.addEventListener('click', getJoke);
wpBtn.addEventListener('click', shareOnWp);

getJoke();