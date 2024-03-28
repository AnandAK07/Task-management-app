const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'tasks'
    }]
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;