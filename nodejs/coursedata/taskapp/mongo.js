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
    db.collection('main').insertOne({
        name: "Ashish",
        age: 23
    })



    db.collection('main').find({
        _id: ObjectID('5e4d7810124534185fe91581'),
    }).count((err, res) => {
        if (!err) {
            return console.log(res);
        }
        console.log(err);
    });

});