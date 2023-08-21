"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
class HTTPConnection {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
    }
    connect() {
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
        this.app.use((0, express_fileupload_1.default)());
        this.app.listen(this.port);
    }
}
exports.default = HTTPConnection;
