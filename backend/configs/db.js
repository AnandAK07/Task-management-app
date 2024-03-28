const mongoose = require("mongoose")

const connection = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log('connection success')
    } catch (error) {
        console.log('connection failure')
    }
}

module.exports = connection;