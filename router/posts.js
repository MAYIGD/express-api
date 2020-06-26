const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const passport = require('passport')
const multer = require('multer');
const fs = require('fs');
const UPLOAD_PATH = '../uploads'
const upload = multer({ dest: UPLOAD_PATH })

const User = require("../models/User")
const Post = require("../models/Post")
const key = require("../config/keys").key

const { request } = require("express")
const router = express.Router()


router.post("/add", passport.authenticate("jwt", { session: false }), (request, response) => {

    const newPost = new Post({
        title: request.body.title,
        content: request.body.content,
        userId: request.user.id
    })

    newPost.save().then(result => {
        response.json({
            status: 1,
            message: null,
            data: result
        })
    }).catch(err => {
        response.json({
            status: 0,
            message: err,
            data: null
        })
    })
})

router.post("/edit/:id", passport.authenticate("jwt", { session: false }), (request, response) => {
    const postId = request.params.id

    Post.findById(postId)
        .then(post => {
            if (post) {
                if (request.user.id == post.userId) {

                    post.title = request.body.title
                    post.content = request.body.content
                    post.save()
                        .then((result) => {
                            response.json({
                                status: 1,
                                message: null,
                                data: result
                            })
                        })
                }
                else {
                    response.json({
                        status: 0,
                        message: "不能編輯不是自己的post",
                        data: null
                    })
                }
            }
            else {
                response.json({
                    status: 0,
                    message: "查無此post",
                    data: null
                })
            }
        })
})

router.delete("/:id", passport.authenticate("jwt", { session: false }), (request, response) => {
    const postId = request.params.id

    Post.findById(postId)
        .then(post => {
            if (post) {
                if (request.user.id == post.userId) {
                    Post.findOneAndDelete({
                        _id: postId
                    })
                        .then((result) => {
                            response.json({
                                status: 1,
                                message: null,
                                data: result
                            })
                        })
                }
                else {
                    response.json({
                        status: 0,
                        message: "不能刪除不是自己的post",
                        data: null
                    })
                }
            }
            else {
                response.json({
                    status: 0,
                    message: "查無此post",
                    data: null
                })
            }
        })
})

router.get("/", passport.authenticate("jwt", { session: false }), (request, response) => {
    const postId = request.params.id

    Post.find()
        .then(posts => {
            if (posts) {
                response.json({
                    status: 1,
                    message: null,
                    data: posts
                })
            }
            else {
                response.json({
                    status: 0,
                    message: "查無",
                    data: null
                })
            }
        })
})

router.get("/:id", passport.authenticate("jwt", { session: false }), (request, response) => {
    const postId = request.params.id

    Post.findById(postId)
        .then(post => {
            if (post) {
                response.json({
                    status: 1,
                    message: null,
                    data: post
                })
            }
            else {
                response.json({
                    status: 0,
                    message: "查無",
                    data: null
                })
            }
        })
})

router.post('/upload', upload.single('fileUpload'), function (req, res, next) {
    const { file } = req
    fs.readFile(file.path, function (err, data) {
        fs.writeFile(`${UPLOAD_PATH}/${file.originalname}`, data, function (err) {
            if (err) res.json({ err })
            res.json({
                msg: '上傳成功'
            });
        });
    })
})


module.exports = router