const express = require('express')
const routes = express.Router();

const messageCommunicate = require("../../classes/chatmessage");

routes.post("/message", async (req, res) => {
    const outputmessage = await messageCommunicate(req.body.message);
    if (outputmessage == undefined) {
        return res.status(500).json({ message: "Some error has occured" })
    }
    console.log(JSON.stringify(outputmessage));
    return res.status(200).json({ message: outputmessage.result })
})

module.exports = routes;