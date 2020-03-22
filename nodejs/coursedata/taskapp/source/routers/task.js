const express = require("express");
const app = express();
const User = require("./../models/task");
const router = express.Router();

router.post("/tasks", async (req, res) => {
    console.log(req.body);
    const task = new Task(req.body);
    // task.save().then(() => {

    //     res.status(201).send(task);
    // }).catch((err) => {
    //     res.status(400).send(err);
    // })

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e)
    }

});


router.get("/tasks", async (req, res) => {
    // User.find({}).then((users) => {
    //     res.status(200).send(users)


    // }).catch((err) => {
    //     res.status(500).send()
    // })

    try {
        const tasks = await Task.find({});
        res.status(201).send(tasks);

    } catch (e) {
        res.status(500).send(e);
    }


});
router.get("/tasks/:id", async (req, res) => {
    var id = req.params.id;
    //     Task.findById(id).then((tasks) => {
    //         if (!tasks) {

    //             return res.status(404).send();
    //         }
    //         res.status(200).send(tasks);

    //     }).catch((err) => {
    //         res.status(500).send(err);
    //     })
    try {
        const tasks = await Task.findById(id);
        res.status(201).send(tasks);
    } catch (e) {
        res.status(500).send(e)
    }




})

router.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body);

    const allowedupdate = ['description', 'completed']

    const flag = updates.every((values) => allowedupdate.includes(values))

    if (!flag) {
        return res.status(400).send({
            error: "Updation not allowed"
        });
    }
    try {
        var task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!task) {

            return res.status(404).send({
                error: "Task not found"
            })

        }
        res.send(task);

    } catch (e) {
        res.status(500).send(e)

    }


});





router.delete("/tasks/:id", async (req, res) => {

    try {
        var task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).send({
                error: "task not found"
            });
        }
        res.send(task);
    } catch (e) {

        res.status(500).send(e)
    }



})

module.exports = router