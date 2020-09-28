import {logError} from "./logger";

const beServerUrl = "http://localhost:5600/";

export async function sendContactEmail(to, message) {
    try {
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                to: to,
                message: message
            })
        };
        const url = `${beServerUrl}sendContactEmail`;
        await fetch(url, options);
    } catch (err) {
        logError("sendEmail", err);
        throw err;
    }
}