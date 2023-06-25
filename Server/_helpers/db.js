// import config from 'config.json';
import mongoose from 'mongoose';
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
// mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
const key = "mongodb+srv://Syed:Abcd@1234+@cluster1.8rjhedc.mongodb.net/users?retryWrites=true&w=majority"
mongoose.connect(key,{
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../public/model/model'),
    Groups: require('../public/model/groupModel'),
    History: require('../public/model/globalChatHistory') ,
    OneToOneChat : require('../public/model/OneChatHistoryModel')
};