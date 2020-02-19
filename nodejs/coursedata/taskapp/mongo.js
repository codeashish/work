const {
    MongoClient,
    ObjectID
} = require('mongodb');


const id = new ObjectID();
// console.log(id.getTimestamp());

const url = 'mongodb://127.0.0.1:27017';

const dbname = "Delete";
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) {
        return console.log("Error happend");
    }
    const db = res.db(dbname);

    db.collection('main').updateMany({
        name: 'Bhagwan',
    }, {
        $set: {
            name: "bhagwan2.0"
        }
    }).then((result) => {
        console.log(result.modifiedCount);
    }).catch((err) => {

        console.log(err);
    });


    // db.collection('main').insertOne({
    //     name: "Boss",
    //     age: 78
    // })


    db.collection('main').deleteOne({
        name: 'Boss',
    }).then((res) => {
        console.log(res.deletedCount);
    }).catch((err) => {
        console.log(err);
    })


    // db.collection('main').find({
    //     _id: ObjectID('5e4d7810124534185fe91581'),
    // }).count((err, res) => {
    //     if (!err) {
    //         return console.log(res);
    //     }
    //     console.log(err);
    // });





});