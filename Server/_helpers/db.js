// import config from 'config.json';
import mongoose from 'mongoose';
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
// mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
const key = "mongodb+srv://Syed:Abcd@1234+@cluster1.8rjhedc.mongodb.net/users?retryWrites=true&w=majority"
mongoose.connect(key,connectionOptions);
mongoose.Promise = global.Promise;

export const User = require('../public/model/model');
export const Groups = require('../public/model/groupModel');
export const History = require('../public/model/globalChatHistory');
export const OneToOneChat = require('../public/model/OneChatHistoryModel');