const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require("../models/user");

router.route("/login").get((req, res) => {
    if (req.session.user_id) {
    return res.redirect("/user/home/" + req.session.user_id);
    }
    res.render ("auth/login");
});


router.post("/login", async (req, res) => {
    const { mail, password } = req.body;
    const foundUser = await User.findOne({ mail });
    var validUser = false;
    if (foundUser) {
        validUser = await bcrypt.compare(password, foundUser.password);
    }
    if (validUser) {
        req.session.user_id = foundUser._id;
        res.redirect("/user/home/"+foundUser._id);
    }
    else {
        res.redirect("/auth/login");
    }
});


router.get("/register", async (req, res) => {
    res.render("auth/register");
});

function makePayment() {
    return true;
}

router.post("/register", async (req, res) => {
    const { name,age,batch,mail,pass } = req.body; 
    const password = await bcrypt.hash(pass, 12);
    nextMonthBatch = batch;
    if (!makePayment) {
        return res.redirect("/auth/register");
    }
    const user = new User({name,age,batch,nextMonthBatch, mail, password });
    await user.save();
    res.redirect(("/auth/login"));
});


router.post("/logout", (req, res) => {
    req.session.user_id = null;
    res.redirect(("/auth/login"));
})


module.exports = router;