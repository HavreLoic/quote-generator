const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const author = document.getElementById('author');
const newQuote = document.getElementById('new-quote');
const twitterButton = document.getElementById('twitter-button');
const loader = document.getElementById('loader');

let quotes = [];

// generate random quote
function randomQuote() {
    loading();
    const singleQuote = quotes[Math.floor(Math.random() * quotes.length)];
    // check if author or else author name is 'Unknown'
    if(!singleQuote.author) {
        author.textContent = 'Unknown';
    } else {
        author.textContent = singleQuote.author;
    }

    // reduce font size on long quotes
    if(singleQuote.text > 60) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = singleQuote.text;
    complete()
}

// get quotes from API
async function getQuotes() {
    loading()
    const quoteURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(quoteURL);
        quotes = await response.json();
        randomQuote()
    } catch (error) {
        
    }
}

// Onload
getQuotes()

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const authorName = author.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${authorName}`;
    window.open(twitterURL, '_blank');
}

twitterButton.addEventListener('click', tweetQuote)
newQuote.addEventListener('click', randomQuote)

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true
}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false
}