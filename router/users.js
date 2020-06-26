const express = require("express")
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
module.exports = router