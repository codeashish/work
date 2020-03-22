// const User = require("./../source/models/user");
// require('./../source/db/mongoose');

// User.updateOne({
//     name: 'Ashish',
// }, {
//     '$set': {
//         age: 20
//     }

// }).then((person) => {
//     console.log(person);
//     return User.countDocuments({
//         age: 20,
//     })

// }).then((sum) => {
//     console.log(sum);

// }).catch((err) => {

//     console.log(err);

// });

const task = require("./../source/models/task");
require('./../source/db/mongoose');

// task.remove({
//     _id: '5e6a431447d0575ead5b6568'
// }).then((res) => {

//     console.log(res);
//     return task.countDocuments({
//         completed: false
//     })

// }).then((res) => {
//     console.log(res);
// }).catch((err) => {

//     console.log(err);
// })


const deletetaskandcount = async (id, description) => {

    const tasks = await task.findByIdAndUpdate(id, {
        description
    });
    const number = await task.countDocuments({
        description
    });
    return number

}





deletetaskandcount('5e6650aa965499360b42a4de', 'Chnaged description').then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err);
})