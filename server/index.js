const http= require('http').createServer();
const io=require('socket.io')(http);
var userData=[]

io.on('connection',function(socket){
    console.log("New connection from socketId=",socket.id)
    socket.on('message',function(msg){
        let obj = userData.find(o => o.userId == socket.id);
        if(obj)
        io.emit('chat',{message:msg,user:obj.name})
    })
    socket.on('disconnect',function(){
        let obj = userData.find(o => o.userId == socket.id);
        if(obj)
        io.emit('gone',obj)
    })
    socket.on('typing',function(){
        let obj = userData.find(o => o.userId == socket.id);
        if(obj)
        io.emit('typing',obj)
    })
    socket.on('setUser',function(data){
        userData.push(data)
        io.emit('new',data)
    })
})

http.listen(4368,function(req){
    console.log("Server started on port 4368")
})