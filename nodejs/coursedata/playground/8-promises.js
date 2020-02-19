const dowork = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([1, 2, 3, 4]);
        reject("This is a error");
    }, 2000)

});

dowork.then((result) => {
    console.log(result);

}).catch((err) => {

    console.log(err);
});