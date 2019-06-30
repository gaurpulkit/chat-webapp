const http= require('http').createServer();
const io=require('socket.io')(http);
var userData=[]

io.on('connection',function(socket){
    console.log("New connection from socketId=",socket.id)
    socket.on('message',function(msg){
        io.emit('chat',msg)
    })
    socket.on('disconnect',function(){
        io.emit('gone')
    })
    socket.on('typing',function(){
        io.emit('typing')
    })
    socket.on('setUser',function(data){
        userData.concat(data)
        io.emit('new',data)
    })
})

http.listen(4368,function(req){
    console.log("Server started on port 4368")
})