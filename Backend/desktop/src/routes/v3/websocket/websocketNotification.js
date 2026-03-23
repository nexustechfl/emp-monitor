const SockJS = require('sockjs-client');

let client, transport;
transport = {
    async start(serverUrl) {
        client = new SockJS(serverUrl);

        client.onopen = () => {
            console.log(`Connected to notification server on ${serverUrl}`);
        };

        client.onmessage = (e) => {
            const message = JSON.parse(e.data);
        }
        client.onclose = () => {
            setTimeout(() => {
                this.start(serverUrl);
            }, 5000);
        };
    },

    async send(message, userId) {
       await client.send(JSON.stringify(message));
    }
}

class SockJsClient {
    constructor(serverUrl = process.env.WEB_SOCKET_SERVER_URL) {
        transport.start(serverUrl);
    }

    async notificationUninstalledAgent(message, userId) {
        await transport.send({ type: "agentUninstall", messages: [message], userId, message }, userId);
    }

    async notificationAdminForEmployeeGeolocationChange(message, userId) {
        await transport.send({ type: "employeeGeolocationChange", messages: [message], userId, message }, userId);
    }
}

module.exports = new SockJsClient();

