const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const flash = require('express-flash')

const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const quotesRoutes = require('./routes/quotes')

require('dotenv').config({path: './config/.env'})
mongoose.set('strictQuery', true); // https://stackoverflow.com/questions/74711770/how-to-fix-mongoose-deprecation-warning-the-strictquery

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride("_method"));
app.use(cors())

// Sessions (express-session, connect-mongo)
app.use(
    session({
        secret: 'free candy inside',
        resave: false, 
        saveUninitialized: false,
        store: MongoStore.create({mongoUrl:process.env.mongoString})
    })
)

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', homeRoutes)
app.use('/quotes', quotesRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})