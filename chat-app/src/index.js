require("dotenv").config();
const http = require("http");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "/public")));

const welcomeMessage = "Welcome, good to see you";

io.on("connection", (socket) => {
  console.log("new websocket connection");

  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit("welcome", generateMessage(user.username, welcomeMessage));
    //sends message to all clients except the current one

    socket.broadcast
      .to(user.room)
      .emit(
        "messageToClients",
        generateMessage(user.username, `${user.username} has joined!`)
      );

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();

    //socket.emit (data to current user), io.emit (data to ALL users), socket.broadcast.emit (data to ALL users EXCEPT the current one);
    //io.to.emit, socket.broadcast.to.emit
  });

  //when userMessage event is met
  socket.on("userMessage", (message, callback) => {
    const user = getUser(socket.id);
    const filter = new Filter();
    //check if message is safe. If it is not, send to current user a specific message
    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed");
    }
    console.log(user);
    // elese send it to all other users
    io.to(user.room).emit(
      "messageToClients",
      generateMessage(user.username, message)
    );

    callback();
  });

  socket.on("sendLocation", (position, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(
        user.username,
        `https://google.com/maps?q=${position.latitude},${position.longitude}`
      )
    );

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "messageToClients",
        generateMessage(user.username, `${user.username} has left`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
