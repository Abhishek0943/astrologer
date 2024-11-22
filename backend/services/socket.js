const { Server } = require("socket.io")
const Redis = require("ioredis")
const Producer = require("../bullmq")
// const pub = new Redis({
//     host: "",
//     port: "13574",
//     user: "default",
// })

// const sub = new Redis({
//     host: "",
//     port: "13574",
//     user: "default",
// })
class SocketService {
    constructor() {
        console.log("socket server")
        this._io = new Server({
            pingTimeout: 60000, cors: {
                origin: ["http://localhost:3000", "http://localhost:3001"],
                methods: ["GET", "POST"]
            }
        })
        sub.subscribe("LOGIN")
        sub.subscribe("REQUEST")
        sub.subscribe("REJECTED")
        sub.subscribe("STARTCHAT")
        sub.subscribe("MESSAGE")
        sub.subscribe("ENDCHAT")
    }
    initListeners() {
        console.log("socket initListeners")
        const io = this._io

        io.on("connect", async (socket) => {
            socket.on("setup", (userId) => {
                socket.join(userId.id)
            })
            // one browser to another browser but same user
            socket.on("login", async (data) => {
                await pub.publish("LOGIN", JSON.stringify(data))
            })

            //   request from client to astrologer
            socket.on("chatRequest", async (data) => {
                await pub.publish("REQUEST", JSON.stringify(data))
            })
            //   request from astrologer to client
            socket.on("chatReject", async (data) => {
                await pub.publish("REJECTED", JSON.stringify(data))
            })
            socket.on("chatStart", async (data) => {
                await pub.publish("STARTCHAT", JSON.stringify(data))
            })
            socket.on("message", async (data) => {
                await pub.publish("MESSAGE", JSON.stringify(data))
            })
            socket.on("endChat", async (data, callback) => {
                await pub.publish("ENDCHAT", JSON.stringify(data))
                callback()
            })
        })
        sub.on("message", (channel, message) => {
            if (channel === "LOGIN") {
                let { id } = JSON.parse(message);
                io.in(id).emit("logout")
            } else if (channel === "REQUEST") {
                let { id, user } = JSON.parse(message);
                console.log(id, user)
                io.in(id).emit("chatReceive", user)
            } else if (channel === "REJECTED") {
                let { id } = JSON.parse(message);
                io.in(id).emit("chatRejected")
            } else if (channel === "STARTCHAT") {
                let { user } = JSON.parse(message);
                io.in(user._id).emit("chatStarts", user)
            } else if (channel === "MESSAGE") {
                let { id, message: a } = JSON.parse(message);
                console.log(id)
                // 66138a3ee1b926f104926c73
                io.in(id).emit("messageReceive", a)
                Producer(a)
            } else if (channel === "ENDCHAT") {
                let { id } = JSON.parse(message);
                io.in(id).emit("chatEnded")
            }
        })
    }
    get io() {
        return this._io
    }
}
module.exports = SocketService;
