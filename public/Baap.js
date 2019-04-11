import express from 'express'
import socket from 'socket.io'

const app = express()

server = app.listen(4000, ()=>{
    console.log('listning on port 3000')
})
const io = socket(server)
