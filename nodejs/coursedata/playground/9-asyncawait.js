const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Number must be non negative')
            }
            resolve(a + b);

        }, 3000)


    })


}




const dowork = async () => {
    const sum = await add(23, 23);
    const sum2 = await add(sum, -50);
    const sum3 = await add(sum2, 50);
    return sum3


    // return 'Ashish'
    // throw new Error('Error occur')


}


dowork().then((res) => {
    console.log(res);
}).catch((err) => {
    console.log('Error', err);
})