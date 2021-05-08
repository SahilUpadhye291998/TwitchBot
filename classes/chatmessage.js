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

async function communicate(input) {
    const sessionId = fs.readFileSync(path.join(__dirname, "..", "token", "watson-token.txt"), { encoding: "utf-8", flag: "r" })
    const payload = {
        assistantId: process.env.WATSON_ASSISTANT_ID,
        sessionId: sessionId,
        input: {
            message_type: "text",
            text: input
        }
    }

    try {
        const message = await assistant.message(payload);
        return message;
    } catch (error) {
        console.log(error);
        return undefined;
    }

}

module.exports = communicate;