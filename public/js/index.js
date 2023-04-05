document.querySelector('.stoa').addEventListener('click', stoaQuote)

// Fetch random document from DB and displays it(quote, author and source)
function stoaQuote(){
    fetch('http://localhost:3000/fetchquote')
    .then(data => data.json())
        .then(data =>{
            document.querySelector('.quote').innerHTML = data.quote
            document.querySelector('.author').innerHTML = data.author
            document.querySelector('.source').innerHTML = data.source
        })
}
