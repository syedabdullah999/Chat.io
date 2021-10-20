const db = require('_helpers/db');
const History = db.History;



var msg = [];


function save_Message(username, message) {
    let user_msg = { username, message };
    let roomname = "Global"
    console.log("aaaaaaaaaaaaaa");
    const history2 = History.findOne({ roomName: roomname });
    console.log("responseeeee", history2);
    if (!history2) {
        console.log("inside saving data to history db");
        let obj = {
            roomName: roomname,
            message: {
                username: "",
                text: ""
            }
        }

        const history = new History(obj);

        history.save()


    }
    console.log("bbbbbbbbbbbbbbbbbbbbb");
    const history3 = History.findOne({})
    let obj = {
    roomName : "Global",
    message :{
        username: username,
        text: message
    }
    }
    // const history = new History(obj);
    const id = History.find({username : username})
    // const history = new History(obj);
    let msg2 = new History(obj)
    // console.log("trueeeeee    ",id._id);
     History.findOneAndUpdate({ roomName: "Global" }, { $push: { History: msg2} });
    // console.log("h1111 1111  :  ",h1);
    msg.push(user_msg);
    console.log(msg, "  :  msg");
    console.log(user_msg, " :  : user_msg");

    return user_msg;
}


function get_All_Messages() {
    let result = msg

    console.log("inside get all previous messages  :  ", result);
    return result
}

module.exports = {
    save_Message,
    get_All_Messages,
};