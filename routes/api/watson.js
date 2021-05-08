const express = require('express')
const routes = express.Router();

const fs = require('fs-extra');
const path = require('path');

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require("ibm-watson/auth");

const authenticator = new IamAuthenticator({
    apikey: process.env.WATSON_ASSISTANT_APIKEY
})

const assistant = new AssistantV2({
    version: "2021-05-08",
    authenticator: authenticator,
    url: process.env.WATSON_ASSISTANT_URL
})

routes.get("/session", async (req, res) => {
    try {
        const session = await assistant.createSession({
            assistantId: process.env.WATSON_ASSISTANT_ID
        })

        fs.writeFileSync(path.join(__dirname, '..', "..", "token", "watson-token.txt"), session["result"]["session_id"]);
        return res.status(200).json({ code: 200, token: session["result"]["session_id"] })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ code: 500, token: "Token not found" })
    }
})

module.exports = routes;