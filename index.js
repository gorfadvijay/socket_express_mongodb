const express = require('express')
const mongoose = require('mongoose')
const socket = require('socket.io')


// App setup
const app = express();
const server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

// Data Base Connection
mongoose.connect('mongodb://vijay:vijay1234@ds125684.mlab.com:25684/socketchat',{ useNewUrlParser: true } );

chatSchema = new mongoose.Schema({
    message : String,
    handle : String
})

const Chat = mongoose.model('Chat' , chatSchema)
Chat ({
     message: 'hello', handle: 'baap' 
}).save((err)=>{
    if (err) throw err
})






// Socket setup & pass server
const io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        console.log(data)
        Chat(data).save((err)=>{
            if (err) throw err
        })
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
