const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const users = require('./router/users')
const posts = require('./router/posts')
const mongoUri = require('./config/keys').mongoUri

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
require("./config/passport")(passport)
app.use("/api/users", users)
app.use("/api/posts", posts)

mongoose.connect(mongoUri, {useNewUrlParser: true})
.then(()=>{
    console.log("mongoDB connect")
})
.catch((error)=>{
console.log(error)
})

app.listen(port, ()=>{
    // console.log("server is running on port "+port)

    console.log(`Server is running on ${port}`)
})

app.get('/test', (reqest, response)=>{
    response.send("jjjjjjjjjjj")
})

app.get('/', (reqest, response)=>{
    response.send("/////")
})