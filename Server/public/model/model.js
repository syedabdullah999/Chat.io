const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userEmail: { type: String, unique: true, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },

});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', schema);