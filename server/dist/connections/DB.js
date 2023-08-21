"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
class DBConnection {
    constructor(config) {
        this.config = config;
    }
    connect() {
        this.connection = mysql2_1.default.createConnection(this.config);
    }
    query(query) {
        return new Promise((resP, rejP) => {
            this.connection.query(query, (err, result) => {
                let data = err ? { error: err } : { result };
                //@ts-ignore
                resP(data);
            });
        });
    }
}
exports.default = DBConnection;
