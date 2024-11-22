const app = require("./app");
const http = require("http");
// const SocketService = require("./services/socket")
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv")
const Message = require("./models/MessageModel");




dotenv.config({ path: "./config/config.env" })


// const { Worker } = require("bullmq")
// const worker = new Worker("message-queue", async (job) => {
//   const a = await Message.create(job.data)
//   console.log(a)
//   return a
// }, {
//   connection: {
//     host: "redis-2bf66ac2-abhishekpundir077-b44b.a.aivencloud.com",
//     port: "13574",
//     user: "default",
//   }
// })
async function init() {
  // const socketService = new SocketService()
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: 258883337715583,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  // Handling Uncaught Exception
  process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
  const httpServer = http.createServer(app)
  // socketService.io.attach(httpServer)
  connectDatabase();
  const server = httpServer.listen(8000, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT || 8000}`);
  });
  // socketService.initListeners()
  process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
      process.exit(1);
    });
  });
}
init()