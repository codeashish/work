const express = require("express");
const app = express();
const User = require("./../models/user");
const router = express.Router();


router.post("/users", async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((err) => {
    //     res.status(400).send(err);

    // })
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }

    // const flag =



});

router.get("/users", async (req, res) => {
    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch((err) => {
    //     res.status(500).send();
    // })
    try {
        const users = await User.find({});
        res.status(201).send(users);
    } catch (e) {
        res.status(500).send();
    }



});



router.get("/users/:id", async (req, res) => {
    console.log(req.params);
    const _id = req.params.id;
    // console.log(_id);
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send();
    //     }
    //     res.status(200).send(user);


    // }).catch((err) => {
    //     res.status(500).send(err);
    // });

    try {
        const users = await User.findById(_id);
        res.status(201).send(users);
    } catch (e) {
        res.status(500).send(e)
    }



});


router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedupdate = ['name', 'email', 'password', 'age'];
    const flag = updates.every((values) => allowedupdate.includes(values))
    if (!flag) {
        return res.status(400).send({
            Error: "Not a valid operations"
        });
    }
    try {
        var user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return res.status(404).send("User not found")
        }
        res.status(201).send(user);


    } catch (e) {
        res.status(400).send(e)
    }


});


router.delete("/users/:id", async (req, res) => {
    try {
        var user = await User.findByIdAndDelete(req.params.id);
        if (!user) {

            return res.status(404).send({
                error: "User not found"
            });
        }
        res.send(user)

    } catch (e) {
        res.status(500).send(e);
    }


});


module.exports = router