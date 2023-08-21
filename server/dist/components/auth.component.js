"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../App");
const queryAuth_1 = require("../querys/queryAuth");
const crypto_1 = require("../tools/crypto");
function AuthComponent() {
    App_1.app.post("/api/auth/reg", (req, res) => {
        checkUser(req.body.username)
            .then(data => {
            var _a;
            //@ts-ignore
            if (((_a = data === null || data === void 0 ? void 0 : data.result) === null || _a === void 0 ? void 0 : _a.length) == 0)
                reg(req, res);
            else
                res.send({ status: 401 });
        });
    });
    App_1.app.post('/api/auth/log', (req, res) => {
        checkUser(req.body.username)
            .then(data => {
            var _a;
            //@ts-ignore
            if (((_a = data === null || data === void 0 ? void 0 : data.result) === null || _a === void 0 ? void 0 : _a.length) > 0)
                log(req, res);
            else
                res.send({ status: 400 });
        });
    });
}
const log = (req, res) => {
    const data = {
        username: req.body.username,
        password: (0, crypto_1.encrypt)(req.body.password),
    };
    selectUser(data)
        .then(data => res.send(data));
};
const selectUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = (0, crypto_1.hashGen)();
    const getUser = yield App_1.DB.query((0, queryAuth_1.selectUserAuthQuery)(data.username, data.password));
    //@ts-ignore
    const setHash = yield App_1.DB.query((0, queryAuth_1.setHashAuthQuery)(hash, getUser.result[0].ID));
    //@ts-ignore
    return { hash, id: getUser.result[0].ID, status: 200 };
});
//компонент регестрации
const reg = (req, res) => {
    const data = {
        name: req.body.name,
        username: req.body.username,
        password: (0, crypto_1.encrypt)(req.body.password),
    };
    const query = (0, queryAuth_1.createUserAuthQuery)(data);
    // @ts-ignore
    App_1.DB.query(query).then(data => res.send({ status: (data === null || data === void 0 ? void 0 : data.error) ? 400 : 200 }));
};
//компонент проверки пользователя 
const checkUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield App_1.DB.query((0, queryAuth_1.checkUserAuthQuery)(username));
    return query;
});
exports.default = AuthComponent;
