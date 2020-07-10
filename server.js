const express=require('express');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);
const PORT = process.env.PORT||3000;

http.listen(PORT, ()=>{
    console.log("listening on port"+PORT)
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
});
//middleware
app.use(express.static('public'));

io.on('connection',function(socket){
    console.log("client is connected"+socket.id)
    //server is recieving this from client and should now broadcast this to all the clients
    socket.on('userMessage',(data)=>{
        io.sockets.emit('userMessage',data)
    });
    socket.on('userTyping',(data)=>{
        socket.broadcast.emit('userTyping',data)
    })

});