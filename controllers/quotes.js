const Quote = require('../models/Quote')

module.exports = {
    quotesRender: async (req,res)=>{
        try{
            let data = await Quote.find({})
            let user = req.user
            res.render('quotes.ejs', {data:data, user:user})
        } catch(err){
            console.log(err)
        }
    },
    addQuote: (req,res)=>{
        try{
            res.render('addQuote.ejs')
        } catch(err){
            console.log(err)
        }
    },
    createQuote: async(req,res)=>{
        try{
            await Quote.create({quote: req.body.quote, author: req.body.author, source: req.body.source})
            res.send('<script> window.opener.location.reload(true); window.close(); </script>') // https://stackoverflow.com/questions/10792408/open-popup-and-refresh-parent-page-on-close-popup
        } catch(err){
            console.log(err)
        }
    },
    deleteQuote: async(req,res)=>{
        try{
            await Quote.findOneAndDelete({_id: req.body.quoteIdFromJS})
            res.end()
        } catch(err){
            console.log(err)
        }
    },
    updateQuote: (req,res)=>{
        try{
            res.render('updateQuote.ejs')
        } catch(err){
            console.log(err)
        }
    },
    updateQuoteInDB: async (req,res)=>{
        try{
            await Quote.findOneAndUpdate({ _id: req.body.id }, 
                {
                    quote: req.body.quote,
                    author: req.body.author,
                    source: req.body.source
                })
            res.send('<script> window.opener.location.reload(true); window.close(); </script>')
        } catch(err){
            console.log(err)
        }
    }
}