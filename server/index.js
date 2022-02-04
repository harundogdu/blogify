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
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));

/* define routes */
app.use('/posts', require('./routes/PostRoute'));

/* start server */
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });