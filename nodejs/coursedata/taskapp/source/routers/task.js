const express = require("express");
const app = express();
const Task = require("./../models/task");
const router = express.Router();
const auth = require("./../middleware/authentication");
const User = require('./../models/user');

router.post("/tasks", auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e)
    }

});

//Get /tasks?completed:true/
//limit and skip /tasks?limit=3&skip=10
///tasks/sortBy=createdAt_asc or createdAt_desc ascending =1 and descending =-1 
router.get("/tasks", auth, async (req, res) => {
    // User.find({}).then((users) => {
    //     res.status(200).send(users)


    // }).catch((err) => {
    //     res.status(500).send()
    // })
    const match = {}
    const sort = {}

    if (req.query.sortBy) {
        var parts = req.query.sortBy.split("_");
        sort[parts[0]] = parts = [1] === 'desc' ? -1 : 1
    }

    if (req.query.completed) {
        match.completed = req.query.completed === 'true' ? true : false

    }

    try {
        // const user = await User.findById('5e7b2e26ded98a6c89e52e31');
        // await req.user.populate({
        //     path: 'tasks',
        //     match: {
        //         match: {
        //             completed: false
        //         }
        //     }
        // }).execPopulate();
        // const tasks = await Task.find({
        //     owner: req.user._id,
        //     completed: true
        // });
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort,
            }
        }).execPopulate();
        // if (!tasks) {
        //     res.status(404).send();
        // }
        res.status(201).send(req.user.tasks);

    } catch (e) {
        res.status(500).send(e);
    }


});
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({
            _id,
            owner: req.user._id
        })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates!'
        })
    }
    /* iohoi hhshdds hsaih adasjhdas daskjdhasdhasd */
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete("/tasks/:id", auth, async (req, res) => {

    try {
        // console.log(req.params.id, req.user._id);
        //var task = await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!task) {
            return res.status(404).send({
                error: "task not found"
            });
        }
        res.send(task);
    } catch (e) {

        res.status(500).send({
            e: "Error"
        })
    }



})

module.exports = router