require('dotenv').config();

module.exports = {
    MONGO_URI:`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.u9g2l.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
}