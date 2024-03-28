const express = require('express');
const connection = require('./configs/db');
const userRouter = require('./routes/user.route');
const taskRouter = require('./routes/task.route')
const authentication = require('./middlewares/authentication')
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use(authentication);
app.use('/task', taskRouter);

const PORT = process.env.PORT
app.listen(PORT, async () => {
    try {
        await connection();
        console.log(`listening at ${PORT}`)
    } catch (error) {
        console.log(error);
    }
})