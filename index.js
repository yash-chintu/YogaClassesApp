const express = require("express");
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/YogaClasses', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


    app.use(express.static("public"));
    // app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.set("view engine", "ejs");
    app.use(session({
    secret: 'secret',
    resave: true,
        saveUninitialized: true
    }))

    const isUser = (req, res, next) => {
        if (!req.session.user_id) {
            return res.redirect('/auth/login')
        }
        next();
    }
    
    
    app.get('/', (req, res, next) => {
        res.redirect('/auth/login');
    });

    app.use("/auth", require("./routes/auth"));
    app.use("/user", isUser,require("./routes/user"));

    app.get('*', function (req, res) {
        res.redirect(("/auth/login"));
    })


    app.listen(3000, () => {
        console.log("Running on port 3000");
    });