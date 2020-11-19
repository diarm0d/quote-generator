const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []

// Show loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;   
}

// hide loading
function hideLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // if author is unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    quoteText.textContent = quote.text;
    //reduce font size for long quotes
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    // stop loader and show quote
    hideLoadingSpinner();
}
// Get Quote from API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl='https://obscure-sands-82167.herokuapp.com/'
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const res = await fetch(proxyUrl + apiUrl) ;
        apiQuotes = await res.json();
        newQuote();
    } catch (error) {
        console.log(error);
    }
}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
    window.open(twitterUrl, '_blank'); 
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
// On Load

getQuote();
