const express = require('express');
const dotenv = require('dotenv');
const methodOverride = require("method-override");
const cors = require('cors');
const { connectToMongoDb } = require('./config/connect');

/* define consts */
const app = express();
dotenv.config();

/* connect to database */
connectToMongoDb();

/* define middlewares */
const corsOptions = {
    origin: '*',
    optionSuccessStatus: 200,
    credentials: true,
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));
app.use(cors(corsOptions));

/* define routes */
app.use('/posts', require('./routes/PostRoute'));
app.use("*", (req, res) => {
    res.status(404).json({
        message: "Page not found"
    });
});

/* start server */
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})