const mongoose = require('mongoose')

const QuoteSchema = new mongoose.Schema({
    quote:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    source:{
        type: String,
        required: false,
    }
}, {collection: 'stoic_pracc'})

module.exports = mongoose.model('Quote', QuoteSchema, 'stoic_pracc')