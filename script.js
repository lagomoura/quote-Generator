const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loading

function loading () {
    loader.hidden = false;
    quoteContainer.hidden = true; 
}

// hide loading

function complete () {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// get quote from API //

async function getQuote() { // Esa funcao sincroniza com cada load da pagina
    loading ();
    const proxyUrl = 'http://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // if author is blanck add 'unknown'
        // Se o informaco puxada a authortext e vazia a informacao final de authortext e unknown. De contrario mostra a informacao puxada de quoteauthor
        if (data.quoteAuthor === '') { 
            authorText.innerText = 'Unknonw'
        } else {
            authorText.innerText = data.quoteAuthor
        }

        // reduce font size for long quotes (+120 caracteres) sea informacao de quotext tem mais de 120 caracteres de comprimento add o classe/setup long-quote no css. La a fonte tem tamanho reduzido. De contrario essa classe e eliminada, ficando com o setup original (from api)
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        authorText.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText;

        // stop loader and show quote
        complete();

    } catch (error) { // caso tenha erro //
        getQuote ();
    }
}

// Twitter quote - quote toma o valor de quotext. author toma o valor de authortext. e mandado abrir a url que se complementa o codigo de essa mesma url com quote e author em uma nova aba//
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners - quando faz click em butao, chama a funcao getquote. o mesmo no botao to twitter chama a funcao tweetquote

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load //

getQuote();
