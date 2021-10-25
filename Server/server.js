require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

const socket = require("socket.io");
const color = require("colors");
const { get_Current_User, user_Disconnect, join_User, get_All_User } = require("./public/model/globalUsers");
const { get_Current_Group_User, join_Group_User } = require("./public/model/groupChatUsers");
const { get_All_Messages, save_Message} = require("./public/model/messages")
const { get_All_Group_Messages , save_Group_Message} = require("./public/model/groupMessages")
// const {  }
const { on } = require('nodemon');
let userId = ""

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./public/controller/controller'));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// let socketConnection = false;
// app.get('/socket', (req, res) => {

//     console.log("socket api");
//     socketConnection()

//     res.send("success")
// })

// function socketConnection() {
//     console.log("hhhhhhh");
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
// const port = 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// SOCKET IMPLEMETATION /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
const io = socket(server);
var c_user;

//initializing the socket io connection 
io.on("connection", (socket) => {
    // var online = Object.keys(io.engine.clients);
    // console.log(online);
    // io.emit('server message', JSON.stringify(online));
    console.log("inside socket", socket.id);
    ////////////////////////////////////////////////////
    //////////////////////////////////////////////////////

    // var online = Object.keys(io.engine.clients);
    // io.emit('server message', JSON.stringify(online));


    ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    //for a new user joining the room
    socket.on("joinRoom", ({ username, roomname }) => {
        //* create user

        console.log("inside socket joinroom", username, roomname);
        const p_user = join_User(socket.id, username, roomname);
        console.log(socket.id, "=id");
        userId = p_user.id
        console.log("userId = ", userId);
        socket.join(p_user.room);

        //display a welcome message to the user who have joined a room
        socket.emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `Welcome ${p_user.username}`,
        });

        //displays a joined room message to all other room users except that particular user
        socket.broadcast.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `${p_user.username} has joined the chat`,
        });
        ////////////////////////////////////////
        ///////////////////////////////////////
        socket.on('typing', (data) => {
            // console.log("in typing socket");
            if (data.typing == true)
                io.emit('display', data)
            else
                io.emit('display', data)
        })
        ////////////////////////////////////////
        ///////////////////////////////////////
    });

    socket.on("getonlineusers", () => {
        let c_user = get_All_User();
        console.log("list of online users ::::::::::::::  ", c_user);
        const ids = c_user.map(o => o.id)
        const filtered = c_user.filter(({id}, index) => !ids.includes(id, index + 1))
        
        console.log("filtered users:    ",filtered);
        
        c_user = filtered
        socket.emit("onlineUsers", {
            c_user: c_user,

        });
    })



    //////////////////one to one chat///////////////////
    socket.on('getMsg', (data) => {
        console.log("data recieved from one to one  chat client : ", data)
        let message = data[0].message
        let userName = data[0].username
        let id = data[0].sendid
        // let msgSave = save-Messages(data);
        console.log("abou to send message   :  ",message, userName, id);
        // socket.join(id)
        socket.broadcast.to(id).emit("sendMsg", {
            message, userName, id
        });
    });
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////    

    //user sending message
    socket.on("chat", (text) => {
        console.log("inside chat socket", text);
        //gets the room user and the message sent
        const p_user = get_Current_User(socket.id);
        const msg = save_Message(p_user.username, text)

        console.log("saved message  :  ",msg);
        console.log("socket.id = ", socket.id);
        console.log("p_users = ", p_user);

        io.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: text,
        });
    });

    socket.on("getMessages",() => {
 
            // var msg;
             
       get_All_Messages().then(function(msg){
        console.log(";;;;;;;;;;;;;;;;;;;; ;;;;;;;;;;;; ");
        console.log("inside get all message socket  :  ",msg);
        socket.emit("displayMsg",{
            msg: msg
        })
    })

    })

    socket.on("getGroupMessages", () => {
        
        get_All_Group_Messages().then(function(msg){
            console.log(" inside get all group messages socket :",msg);

        socket.emit("displayGroupMessage",{
            msg: msg
        })   
        })


    })
    
    //when the user exits the room
    socket.on("disconnect", () => {
        //the user is deleted from array of users and a left room message displayed
        const p_user = user_Disconnect(socket.id);
        console.log("updated users list : ", p_user);
        if (p_user) {
            io.to(p_user.room).emit("message", {
                userId: p_user.id,
                username: p_user.username,
                text: `${p_user.username} has left the chat`,
            });
        }
    });


    ///////////////////////// group chat //////////////////////////////////
    socket.on("groupChat", ({ username, roomname }) => {

        console.log("inside socket GROup Chat", username, roomname);
        const p_user = join_Group_User(socket.id, username, roomname);
        console.log(socket.id, "=id");
        userId = p_user.id
        console.log("userId = ", userId);
        socket.join(roomname);

        socket.on('typingg', (data) => {
            // console.log("in typing socket");
            if (data.typing == true)
                io.emit('displayy', data)
            else
                io.emit('displayy', data)
        })


    });
    socket.on("groupChatMessage", (text,groupname) => {
        console.log("inside chat socket", text,groupname);
        //gets the room user and the message sent
        const p_user = get_Current_Group_User(socket.id);
        const msg = save_Group_Message(p_user.username,groupname, text)

        console.log("socket.id = ", socket.id)
        console.log("p_users = ", p_user);

        io.to(p_user.room).emit("groupMsg", {
            userId: p_user.id,
            username: p_user.username,
            text: text,
        });
    });



});




