const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    createSocket,
    delete: _delete
};

async function authenticate( userParam ) {
    console.log("login service",userParam.userName, userParam.password);
    const user = await User.findOne({ userName: userParam.userName });
    console.log(user)
    console.log(userParam.password)
    console.log(user.password)
    
    if (user && bcrypt.compareSync(userParam.password, user.password)) {
        console.log("password correct");
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function createSocket() {
    

    return console.log("success")
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    try {
        
     console.log("A");
     if (await User.findOne({ username: userParam.userName })) {
        console.log("B");
        throw 'Username "' + userParam.userName + '" is already taken';
    }
    
    console.log("C");
    const user = new User(userParam);
    
    console.log("D");
    // hash password
    if (userParam.password) {
        console.log("E");
        user.password = bcrypt.hashSync(userParam.password, 10);
    }
    console.log("F");
    
    // save user
    await user.save()
    console.log(user)
    console.log("G");
    
}
    catch (error) {
        console.log("I")
        return error
    }

    
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}