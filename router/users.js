const express = require("express")
const bcrypt = require("bcrypt")

const User = require("../models/User")
const router = express.Router()
// router.get("/", (request, response) => {
//     response.json({
//         user: "MAY"
//     })
// })
// router.get("/:id", (request, response) => {
//     const id = request.params.id
//     let usr = users.find(user => user.id == id)
//     response.json(usr)
// })

router.post("/register", (request, response) => {
    User.findOne({
        mail: request.body.mail
    }).then((user) => {
        if (user) {
            response.json({
                error: "你註冊過了"
            })
        }
        else {
            const newUser = new User({
                name: request.body.name,
                password: request.body.password,
                mail: request.body.mail
            })
            bcrypt.hash(newUser.password, 10, (error, hash) => {
                if (error) {
                    throw error
                }
                else {
                    newUser.password = hash
                    newUser.save()
                        .then((user) => {
                            response.json(user)
                        })
                        .catch((error) => {
                            response.json(error)
                        })
                }
            })

        }
    })
})

router.post("/login", (request, response) => {
    User.findOne({
        mail: request.body.mail
    }).then((user) => {
        if (user) {
            bcrypt.compare(request.body.password, user.password)
            .then((result)=>{
                if(result){
                    response.json(user)
                }
                else{
                    response.json({
                        error: "密碼錯誤"
                    })
                }
            })
        }
        else {

            response.json({
                error: "你應該先註冊"
            })
        }
    })
})


module.exports = router