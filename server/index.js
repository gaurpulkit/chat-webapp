const http= require('http').createServer();
const io=require('socket.io')(http);

io.on('connection',function(socket){
    io.emit('new');
    socket.on('message',function(msg){
        io.emit('chat',msg)
    })
    socket.on('disconnect',function(){
        io.emit('gone')
    })
    socket.on('typing',function(){
        io.emit('typing')
    })
})

http.listen(4368,function(req){
    console.log("Server started on port 4368")
})