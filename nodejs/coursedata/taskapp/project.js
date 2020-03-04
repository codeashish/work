const cmd = require('node-cmd');

const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, '/media/ashish/DATA/Courses/Videolectures/December/nodejs');
fs.readdir(directoryPath, function (err, files) {

    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(function (file) {

        console.log(file);
    });
});




// cmd.get('xdg-open /media/ashish/DATA/Courses/Videolectures/December/nodejs', (err, res) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log("Done");
// });


// cmd.run('xdg-open /media/ashish/DATA/Courses/Video\ Lectures/December/');
// console.log("HIII");0