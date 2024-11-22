const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const errorMiddleware = require("./middleware/error");
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', "http://localhost:3002"];

app.use(cors({
  origin: allowedOrigins,
}));
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: true }));


const userRoutes = require("./routes/userRoutes")
// const chat = require("./routes/chatRoutes")
const adminRoutes = require("./routes/adminRoutes")
// // const roleRoutes = require("./routes/roleRoutes")
// const categoryRoutes = require("./routes/categoryRoutes")
// const astro = require("./routes/astroRoutes");
// const level = require("./routes/levelRoutes");
// const rechargeOffer = require("./routes/rechargeOfferRoutes.js");
// const gift = require("./routes/giftRoutes.js");
// const tarot = require("./routes/tarotRoutes.js");
// const Horoscope = require("./routes/horoscopeRoutes.js");
// const astroGift = require("./routes/astroGiftRoutes.js");
// // const session = require("./routes/sessionRoutes");
// const recharge = require("./routes/rechargeRoutes.js");
// const blog = require("./routes/blogRoutes");
// // const offChat = require("./routes/offChatRoutes.js");
// // const Cancel = require("./routes/Cancel.js");
// // const invoice = require("./routes/astroBankRoutes.js");
// app.use("/api/v1", recharge)
// // app.use("/api/v1", invoice)
// // app.use("/api/v1", Cancel)
// // app.use("/api/v1", offChat)
app.use("/api/v1", userRoutes)
// // app.use("/api/v1", chatRoutes)
app.use("/api/v1", adminRoutes)
// app.use("/api/v1", astro)
// app.use("/api/v1", level)
// app.use("/api/v1", rechargeOffer)
// app.use("/api/v1", blog)
// app.use("/api/v1", astroGift)
// // app.use("/api/v1", roleRoutes)
// app.use("/api/v1", categoryRoutes)
// app.use("/api/v1", gift)
// // app.use("/api/v1", astro)
// app.use("/api/v1", chat)
// app.use("/api/v1", tarot)
// app.use("/api/v1", Horoscope)

app.use(express.static(path.join(__dirname, "./build")));


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});



app.use(errorMiddleware);

module.exports = app;
