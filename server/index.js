const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
const port = 5000
const {Server} = require('socket.io')

const server  = http.createServer(app)

const io = new Server(server,{
    cors : {
        origin : "http://localhost:3000",
        methods : ["GET","POST"]
    }
})
app.use(cors())
io.on("connection",(socket)=>{
    console.log(`User connected : ${socket.id}`)

    socket.on("join_room",(data)=>{
       socket.join(data)
       console.log(`User with ID : ${socket.id} joined romm : ${data}`)
    })
    socket.on("send_message",(data)=>{
        // console.log(data)
        socket.to(data.room).emit("recieve_message",data)
    })
    socket.on("disconnect",()=>{
        console.log(`User disconnected : ${socket.id}`)
    })
})
server.listen(port,()=>{
    console.log(`Server started running on port ${port}`)
})
