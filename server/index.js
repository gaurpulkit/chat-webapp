const http= require('http').createServer();
const io=require('socket.io')(http);

io.on('connection',function(socket){
    console.log("New Connection!");
    socket.on('message',function(msg){
        io.emit('message',msg)
    })
    socket.on('disconnect',function(){
        console.log("Disconnected!");
    })
})

http.listen(4368,function(req){
    console.log("Server started on port 4368")
})