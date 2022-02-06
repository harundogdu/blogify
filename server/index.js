const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const methodOverride = require("method-override");
const cors = require('cors');
//const ejs = require('ejs');
const { connectToMongoDb } = require('./config/connect');
//const PageRouter = require('./routes/PageRouter');
const PostRouter = require('./routes/PostRouter');
const AuthRouter = require('./routes/AuthRouter');
const verifyToken = require('./middlewares/VerifyToken');

/* define consts */
const app = express();
dotenv.config();

/* globals */
//global.userIN = null;

/* template Engine*/
//app.set('view engine', 'ejs');

/* connect to database */
connectToMongoDb();

/* static */
app.use(express.static('public'));

/* define middlewares */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));
app.use(
    session({
        secret: 'mern-blogapp-secret', // session secret
        resave: false,
        saveUninitialized: true,
    })
);

/*
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
});
*/

/* define routes */
//app.use('/', PageRouter);

app.use("/auth", AuthRouter);
app.use('/posts', PostRouter);
app.use('/', (req, res) => {
    res.send("Hi, welcome to my RESTFUL BlogAPI 😍");
})

/* start server */
app.listen(process.env.PORT || 5000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});