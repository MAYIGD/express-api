const express = require('express')
const users = require('./router/users')
const app = express()
const port = 8000
app.use("/api/users", users)
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