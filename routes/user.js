const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.route("/home/:id").get(async (req, res) => {
    user_id = req.params.id;
    const user = await User.findById(user_id);
    res.render("user/home",{user});
});

router.route("/changeBatch/:id").get(async (req, res) => {
    user_id = req.params.id;
    const user = await User.findById(user_id);
    res.render("user/changeBatch", { user });
});

router.post("/changeBatch/:id", async (req, res) => {
    user_id = req.params.id;
    const { batch } = req.body;
    const user = await User.findById(user_id);
    user.nextMonthBatch = batch;
    await user.save();
    res.redirect("/user/home/" + user_id);
});

module.exports = router;