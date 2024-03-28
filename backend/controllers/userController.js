const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signUpController = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send({ message: 'Missing credentials' });
    }
    const user = await userModel.findOne({ email: email });
    if (user) {
        return res.status(400).send('Email is already exist');
    }
    try {
        bcrypt.hash(password, 5, function (err, hash) {
            if (err) {
                return res.status(500).send({ message: err })
            }
            // await userModel.create({name:name,email:email,password:password});
            const user = new userModel({ name: name, email: email, password: hash });
            user.save();
            console.log('Signup successfull');
            return res.status(200).send('Signup successfull');
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send('Signup failure');
    }
}

const loginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: 'Missing credentials' });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
        return res.status(400).send('No account exist');
    }
    const userId = user._id.toString();
    const hash = user.password;
    try {
        bcrypt.compare(password, hash, async function (err, result) {
            if (err) {
                console.log(err)
            } else if (result) {
                const token = jwt.sign({ userId: userId }, process.env.SECREATE_KEY);
                return res.status(200).send(token);
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send('Signup failure');
    }
}



module.exports = { signUpController, loginController };