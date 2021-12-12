const { Member, Message, User, Room } = require('../models')
const messageService = require('../services/messageService')
const session = require('express-session')
const passport = require('passport')

module.exports = server => {
  const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:8080',
      credentials: true
    },
    allowEIO3: true
  })

  // 公開聊天室
  const publicNamespace = io.of('/chat/public')
  publicNamespace.on('connection', socket => {
    console.log('連接成功，上線ID: ', socket.id)
    socket.onAny((event, ...args) => {
      console.log(event, args)
    })

    //監聽並提示有人上線了
    socket.on('onlineHint', async user => {
      const profile = await User.findOne({
        raw: true,
        nest: true,
        where: { id: user.user.id },
        attributes: ['id', 'account', 'name', 'avatar']
      })
      const messages = await messageService.getMessages()
      publicNamespace.emit('onlineHint', messages)
      socket.broadcast.emit('onlineHint', `${profile.name}進入聊天室了！`)
    })

    // 監聽訊息
    socket.on('getMessage', async message => {
      console.log('服務端 接收 訊息: ', message)
      await Member.findOrCreate({ where: { UserId: message.user.id, RoomId: 1 } })
      Message.create({
        content: message.content,
        UserId: message.user.id,
        roomId: 1,
        isRead: false
      }).then(message => {
        Message.findByPk(message.id, {
          include: [{ model: User, attributes: ['id', 'account', 'name', 'avatar'] }]
        }).then(message => {
          //回傳 message 給所有客戶端(包含自己)
          message['socketId'] = socket.id
          publicNamespace.emit('getMessage', message)
        })
      })
    })

    //監聽並提示有人下線了
    socket.on('offlineHint', async user => {
      const profile = await User.findOne({
        raw: true,
        nest: true,
        where: { id: user.user.id },
        attributes: ['id', 'account', 'name', 'avatar']
      })
      publicNamespace.emit('offlineHint', `${profile.name}離開聊天室了！`)
    })

    // 連接斷開
    socket.on('disconnect', () => {
      console.log('有人離開了！， 下線ID: ', socket.id)
    })
  })

  // 私人聊天室
  const privateNamespaces = io.of(/(?:\/chat\/user)\d+/)
  privateNamespaces.on('connection', socket => {
    console.log('連接成功，上線ID: ', socket.id)
    console.log('目前連線數量: ', privateNamespaces.sockets.size)
    // 可以在伺服器端顯示通道過來的所有事件，以及相關的參數
    socket.onAny((event, ...args) => {
      console.log(event, args)
    })

    //監聽並提示有人上線了
    socket.on('onlineHint', async user => {
      const profile = await User.findOne({
        raw: true,
        nest: true,
        where: { id: user.user1.id },
        attributes: ['id', 'account', 'name', 'avatar']
      })
      const roomsFor1 = await Member.findAll({ raw: true, nest: true, where: { UserId: user.user1.id } })
      const roomsFor2 = await Member.findAll({ raw: true, nest: true, where: { UserId: user.user2.id } })

      let room = null
      if (roomsFor1 && roomsFor2) {
        for (let i = 0; i < roomsFor1.length; i++) {
          for (let j = 0; j < roomsFor2.length; j++) {
            roomsFor1[i].RoomId === roomsFor2[j].RoomId ? (room = roomsFor1[i].RoomId) : (room = null)
          }
        }
        socket.join(room)
      }

      if (!room) {
        const newRoom = await Room.create({ name: `user${user.user1.id}&user${user.user2.id}的聊天室` })
        await Member.create({ UserId: user.user1.id, RoomId: newRoom.id })
        await Member.create({ UserId: user.user2.id, RoomId: newRoom.id })
        socket.join(newRoom.id)
      }
      console.log(socket.adapter)
      socket.emit('onlineHint', `${profile.name}進入聊天室了！`)
    })

    // 監聽訊息
    socket.on('getMessage', data => {
      console.log('服務端 接收 訊息: ', data)
      // Message.create({
      //   content: data.text,
      //   UserId: data.UserId
      // }).then(message => {
      //   Message.findByPk(message.id, {
      //     include: [User]
      //   }).then(message => {
      //     //回傳 message 給所有客戶端(包含自己)
      //     privateNamespace.emit('getMessage', message)
      //   })
      // })
    })

    //監聽並提示有人下線了
    socket.on('offlineHint', userName => {
      privateNamespace.emit('offlineHint', userName)
    })

    // 連接斷開
    socket.on('disconnect', () => {
      console.log('有人離開了！， 下線ID: ', socket.id)
    })
  })
}
