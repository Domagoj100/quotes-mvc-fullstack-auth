const Quote = require('../models/Quote')

module.exports = {
    homeRender: async (req,res)=>{
        try{
            let data = await Quote.aggregate([{ $sample:{size:1} }])
            let user = req.user
            res.render('index.ejs', {data:data, user:user})
        } catch(err){
            console.error(err)
        }
    },
    fetchQuote: async (req,res)=>{
        try{
             let data = await Quote.aggregate([{ $sample:{size:1} }])
             res.json(data[0])
        } catch(err){
            console.error(err)
        }
    }
}
