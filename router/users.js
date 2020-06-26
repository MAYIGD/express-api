const express = require("express")
const User = require("../models/User")
const router = express.Router()
const users = [
    {
        id: 1,
        user: "MAY"
    },
    {
        id: 2,
        user: "MAY2"
    },
    {
        id: 3,
        user: "MAY3"
    }
]
router.get("/", (request, response) => {
    response.json({
        user: "MAY"
    })
})
router.get("/:id", (request, response) => {
    const id = request.params.id
    let usr = users.find(user=>user.id == id)
    response.json(usr)
})
router.post("/register", (request, response) => {
    User.findOne({
        mail:request.body.mail
    }).then((user)=>{
        if(user){
            response.json({
                error:"你註冊過了"
            })
        }
        else{
            const newUser = new User({
                name:request.body.name,
                password:request.body.password,
                mail:request.body.mail
            })
            newUser.save()
            .then((user)=>{
                response.json(user)
            })
            .catch((error)=>{
                response.json(error)
            })
        }
    })
})
module.exports = router