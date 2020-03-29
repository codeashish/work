const cmd = require("node-cmd");
cmd.get("mkdir -p public/css public/js public/images", (err, data) => {
    if (!err) {
        cmd.run("mkdir -p source/db source/middleware source/routers source/public")
    }
    cmd.run("touch source/app.js");
    cmd.run(" npm init --y")
    cmd.get("sudo npm install express", (err, data, stdir) => {
        console.log(stdir, data);
    })

    cmd.run("git init");

});