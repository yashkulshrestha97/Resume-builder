const express =require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
var cookieParser = require('cookie-parser');

// import routes
authRoute = require('./routes/auth');
infoRoute = require('./routes/info');
postRouter = require('./routes/posts');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));


const dbURI = 'mongodb+srv://yashcode:Yash12345@nodetuts.tsyyp.mongodb.net/auth-jwt?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(4000))
  .catch(err => console.log(err));

// middleware
app.use(express.json());
app.set('view engine', 'ejs');

// route middlewares
app.use('/api/user',authRoute);
app.use('/api/user',infoRoute)
// app.use('/api/posts',postRouter);

