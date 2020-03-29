const express = require("express");
const app = express();
const User = require("./../models/user");
const router = express.Router();
const auth = require("./../middleware/authentication");
const multer = require('multer');
const sharp = require('sharp')
const sendWelcomeemail = require("./../emails/account");

const avtaar = multer({
    // dest: 'avtaar',
    limits: {
        fileSize: 1000000,

    },
    fileFilter(req, file, cb) {

        //if (!file.originalname.endsWith('doc') || (!file.originalname.endsWith('docx'))) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload a image"));
        }
        cb(undefined, true)
        //cb("Not a valid file extension")
        //cb(undefined, true);
        //cb(undefined,false)
    }
})


router.post("/users", async (req, res) => {
    console.log(req.body);

    const user = new User(req.body);
    sendWelcomeemail(user.email, user.name);
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((err) => {
    //     res.status(400).send(err);

    // })
    try {
        await user.save();
        const token = await user.generatejwttoken();
        res.status(201).send({
            user,
            token
        });

    } catch (e) {
        res.status(400).send(e);
    }




});

router.post('/users/login', async (req, res) => {
    console.log(req.body.email, req.body.password)
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generatejwttoken();
        res.send({
            user: user,
            //user.getPublicProfle()
            token
        })
        // res.send(user)
    } catch (e) {
        res.status(400).send({
            Error: e
        })
    }
})


router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.user.save();
        res.send("Sucessfully Log out!")
    } catch (e) {
        res.status(500).send("Error");

    }


});



router.post("/users/logoutall", auth, async (req, res) => {

    try {
        req.user.tokens = [];
        await req.user.save();
        res.send("Log out from all")
    } catch (e) {
        res.status(500).status("Error")
    }
});




router.get("/users/me", auth, async (req, res) => {
    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch((err) => {
    //     res.status(500).send();
    // })
    // try {
    //     const users = await User.find({});
    //     res.status(201).send(users);
    // } catch (e) {
    //     res.status(500).send();
    // }
    res.send(req.user);



});



// router.get("/users/:id", async (req, res) => {
//     console.log(req.params);
//     const _id = req.params.id;
//     // console.log(_id);
//     // User.findById(_id).then((user) => {
//     //     if (!user) {
//     //         return res.status(404).send();
//     //     }
//     //     res.status(200).send(user);


//     // }).catch((err) => {
//     //     res.status(500).send(err);
//     // });

//     try {
//         const users = await User.findById(_id);
//         res.status(201).send(users);
//     } catch (e) {
//         res.status(500).send(e)
//     }



// });


router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedupdate = ['name', 'email', 'password', 'age'];
    const flag = updates.every((values) => allowedupdate.includes(values))
    if (!flag) {
        return res.status(400).send({
            Error: "Not a valid operations"
        });
    }
    try {
        //  var user = await User.findByIdAndUpdate(req.params.id, req.body, {
        //    new: true,
        //  runValidators: true
        //});

        console.log(req.user)

        updates.forEach((update) => {

            req.user[update] = req.body[update];
        })
        await req.user.save();
        // if (!user) {
        //     return res.status(404).send("User not found")
        // }
        res.status(201).send(req.user);


    } catch (e) {
        res.status(400).send(e)
    }


});


router.delete("/users/me", auth, async (req, res) => {
    try {

        // if (!user) {

        //     return res.status(404).send({
        //         error: "User not found"
        //     });
        // }
        await req.user.remove()
        res.send(req.user)

    } catch (e) {
        res.status(500).send(e);
    }


});

router.post("/users/me/avtaar", auth, avtaar.single('avtaar'), async (req, res) => {
    //  req.user.avtaar = req.file.buffer;
    const buffer = await sharp(req.file.buffer).resize({
        width: 250,
        height: 250
    }).png().toBuffer()
    req.user.avtaar = buffer;
    await req.user.save();
    res.send()

}, (error, req, res, next) => {
    /* all 4 arguments are imp */
    res.status(400).send({
        error: error.message
    });
})

router.delete("/users/me/avtaar", auth, avtaar.single('avtaar'), async (req, res) => {
    req.user.avtaar = undefined;
    await req.user.save()
    res.send()


})

router.get("/users/:id/avtaar", async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avtaar) {
            throw new Error()
        }
        res.set('Content-Type', "image/png");
        res.send(user.avtaar)
    } catch (e) {
        res.status(404).send({
            error: e
        })
    }


});


module.exports = router