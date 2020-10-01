const expresss = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/keys');
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const cors  = require('cors');
require('dotenv').config();

const app = expresss();

// BodyParser Midleware

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());
app.use('/api/items', cors(), items);
app.use('/api/users', cors(), users);
app.use('/api/auth', cors(), auth);


mongoose.connect(db.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('mongo Connected');
    app.listen(process.env.PORT || 4000);
})
.catch((err) => {
    console.log(err);
})



