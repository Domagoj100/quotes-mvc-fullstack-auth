const deleteButton = document.querySelectorAll('.fa-trash-can')
const updateButton = document.querySelectorAll('.fa-cog')

Array.from(deleteButton).forEach(ele=> ele.addEventListener('click', deleteQuote))
Array.from(updateButton).forEach(ele=> ele.addEventListener('click', updateQuote))

document.querySelector('.fa-plus').addEventListener('click', addQuote);

function addQuote(){
    window.open('/quotes/addQuote', '' , 'left=450,top=100,width=640,height=300')
}
function updateQuote(){
    const id = this.closest('.quote-box').dataset.id
    const quote = this.closest('.quote-box').querySelector('p').innerText
    const author = this.closest('.quote-box').querySelector('.author').innerText
    const source = this.closest('.quote-box').querySelector('.source').innerText
    const popupWindow = window.open('/quotes/updateQuote', '', 'left=450,top=100,width=640,height=300')
    popupWindow['id'] = id
    popupWindow['quote'] = quote
    popupWindow['author'] = author
    popupWindow['source'] = source
}

async function deleteQuote(){
    const quoteId = this.closest('.quote-box').dataset.id
    try{
        const action = await fetch('quotes/deleteQuote',{
            method: 'delete',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                'quoteIdFromJS': quoteId
            })
        })
        location.reload()
    } catch(err){
        console.log(err)
    }
}