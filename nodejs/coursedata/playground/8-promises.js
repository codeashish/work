// const dowork = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve([1, 2, 3, 4]);
//         reject("This is a error");
//     }, 2000)

// });

// dowork.then((result) => {
//     console.log(result);

// }).catch((err) => {

//     console.log(err);
// });


const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);


        }, 3000)

    })
}


// add(1, 2).then((res) => {
//     console.log(res);
//     add(res, 4).then((res) => {
//         console.log(res);
//     }).catch((err) => {
//         console.log(err);
//     })




// }).catch((err) => {
//     console.log(err);
// })


add(1).then((sum) => {
    console.log(sum);
    return add(sum, 4);
}).then((sum2) => {
    console.log(sum2);
}).catch((err) => {
    console.log(err);
})