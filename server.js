const express = require("express")
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const initRoutes = require("./routes/web")
const mongoose = require("mongoose")
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo');
require('dotenv').config()


// database connection
const url = process.env.DB_URL
mongoose.connect(url, {useFindAndModify: true, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log("database connected")
}).catch(err => {
    console.log(" connection failed")
})

const PORT = process.env.PORT || 3000

//store sessions

const mongostore = MongoStore.create({
    mongoUrl : process.env.DB_URL,
    collectionName : "sessions"
})

//session 
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store : mongostore,
    saveUninitialized: false,
    cookie: {  maxAge: 1000 * 60 * 60 * 24}
  }))


const publicdir = path.join(__dirname, '/public')
app.use(express.static(publicdir))

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

app.use(flash());

initRoutes(app)

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`)
})