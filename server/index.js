const http= require('http').createServer();
const io=require('socket.io')(http);
var userData=[]

io.on('connection',function(socket){
    console.log("New connection from socketId=",socket.id)
    socket.on('message',function(msg){
        console.log("userdata=",userData)
        console.log(socket.id)
        let obj = userData.find(o => o.userId == socket.id);
        console.log(obj)
        if(obj)
        io.emit('chat',{message:msg,user:obj.name})
    })
    socket.on('disconnect',function(){
        io.emit('gone')
    })
    socket.on('typing',function(){
        io.emit('typing')
    })
    socket.on('setUser',function(data){
        userData.push(data)
        console.log(data,userData)
        io.emit('new',data)
    })
})

http.listen(4368,function(req){
    console.log("Server started on port 4368")
})