const { Queue } = require("bullmq")
const MessageQueue = new Queue("message-queue", {
    connection: {
        // port: "13574",
        // user: "default",
    }

})
// const worker = new Worker("message-queue", async (job) => {
//     const a = await MessageQueue.getJobCounts()
//     return a
// })

async function init(message) {
    const res = await MessageQueue.add("message", message, { removeOnComplete: true })
}
module.exports = init