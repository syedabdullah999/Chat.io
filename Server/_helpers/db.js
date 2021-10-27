const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../public/model/model'),
    Groups: require('../public/model/groupModel'),
    History: require('../public/model/globalChatHistory') ,
    OneToOneChat : require('../public/model/OneChatHistoryModel')
};