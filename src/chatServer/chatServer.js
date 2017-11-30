import express from 'express'
import Message from './Models/Message'

const app = express()
app.set('port', process.env.PORT || 3001)


const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    socket.on('chat message', params => {
        Message.create(params, (message) => {
            io.emit('chat message', message)
        })
    })
})

http.listen(app.get('port'), () => {
    console.log('Chat Server listening on ' + app.get('port'))
})