/*
 * @Description: 
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-06-15 09:06:54
 * @LastEditors: 王强
 * @LastEditTime: 2020-06-15 15:01:18
 */
let express = require('express');
let app = express();
let cors = require("cors");
let server = require('http').createServer(app);
let io = require('socket.io')(server);

app.use(cors)
app.use('/', express.static(__dirname + '/public'));

server.listen(9527);

// 定义用户数据
const socketList = {};
const users = [];

//socket部分
io.on('connection', function (socket) {
    console.log('用户链接成功了')
    // 监听 用户加入群聊
    socket.on('join', (name, img,content) => {
        console.log(name, img,content)
        //console.log(socket);
        socket.name = name;
        socketList[name] = socket.id;
        let user = { id: socket.id, name: name, img: img, content: content,times: new Date().getTime(), isOwn: true,isJoin:false};
        users.push(user);

        socket.broadcast.emit('welcome', name, users);
        socket.emit('welcome', name, users, socket.id);
    });

    //接收并处理客户端的hi事件
    socket.on('message',data => {
        //广播
        socket.broadcast.emit('sendMsg',data);
    })

    //断开事件
    socket.on('disconnect', function () {
        console.log('用户断开链接')
        // socket.broadcast用于向整个网络广播(除自己之外)
        if(socketList.hasOwnProperty(socket.name)){
            //删除
            delete socketList[socket.name];
            for(var i=0;i<users.length;i++){
                if(users[i].name == socket.name){
                    users.splice(i,1);
                }
            }
            //广播有用户退出
            socket.broadcast.emit('quit',socket.name,users);
        }
    })

});
