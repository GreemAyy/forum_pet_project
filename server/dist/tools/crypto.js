"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashGen = exports.encrypt = void 0;
const crypto_1 = require("crypto");
const encrypt = (password) => {
    const secret = 'qwerty';
    const hash = (0, crypto_1.createHmac)("sha256", secret)
        .update(password)
        .digest('hex');
    return hash;
};
exports.encrypt = encrypt;
const hashGen = () => {
    const datas = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    let total = '';
    for (let i = 0; i < 20; i++) {
        total += datas[Math.floor(Math.random() * (datas.length - 1))];
    }
    return total;
};
exports.hashGen = hashGen;
