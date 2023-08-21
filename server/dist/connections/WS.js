"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WSConnection {
    constructor(app) {
        this.WS = require('express-ws')(app);
        this.aWSS = this.WS.getWss();
    }
}
exports.default = WSConnection;
