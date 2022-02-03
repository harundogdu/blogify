const express = require('express');
const dotenv = require('dotenv');
const { connectToMongoDb } = require('./config/connect');

/* define consts */
const app = express();
dotenv.config();

/* connect to database */
connectToMongoDb();

/* define middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* define routes */
app.use('/posts',require('./routes/PostRoute'));

/* start server */
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})