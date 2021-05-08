const express = require("express");
const app = express();
require("dotenv").config();

const watsonRoutes = require("./routes/api/watson");
const chatapproute = require("./routes/api/chatapproute");

app.use(express.json());

app.use("/api/watson", watsonRoutes);
app.use("/api/chat", chatapproute);

app.listen(process.env.PORT, (req, res, next) => {
    console.log(`server started at port : ${process.env.PORT}`)
});
