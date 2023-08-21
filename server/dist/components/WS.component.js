"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../App");
const WSComponent = () => {
    //@ts-ignore
    App_1.app.ws('/m', (ws) => {
        ws.on('message', (msg) => {
            const message = JSON.parse(msg);
            switch (message.method) {
                case 'connect':
                    getMessages(ws, message);
                    break;
            }
        });
    });
};
//@ts-ignore
const broadcastConnect = (ws, msg) => {
    App_1.WS.aWSS.clients.forEach(client => {
        client.send('ok');
    });
};
const getMessages = (ws, message) => {
    broadcastConnect(ws, message);
};
exports.default = WSComponent;
