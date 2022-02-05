const mongoose = require('mongoose');

module.exports.connectToMongoDb = async function connectToDb() {
    try {
        await mongoose.
            connect(`mongodb+srv://ancyradev:cZSID17kumRRhq2C@cluster0.uxbfc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            }).then(() => {
                console.log('Connected to database');
            }).catch((err) => {
                console.log('Error connecting to database: ', err);
            });
    } catch (error) {
        console.log('Error connecting to database: ', error);
    }
}