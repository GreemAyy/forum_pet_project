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
function UserComponent() {
    App_1.app.get('/api/user/get-master/:id/:hash', (req, res) => {
        App_1.DB.query((0, queryAuth_1.getUserQuery)(req.params.id, req.params.hash))
            .then(data => {
            var _a;
            //@ts-ignore
            const result = (data === null || data === void 0 ? void 0 : data.result.length) > 0 ? (_a = data === null || data === void 0 ? void 0 : data.result) === null || _a === void 0 ? void 0 : _a[0] : { status: 400 };
            //@ts-ignore
            if ((data === null || data === void 0 ? void 0 : data.result.length) > 0)
                result.status = 200;
            res.send(result);
        });
    });
    App_1.app.get('/api/get-user/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const call = (yield App_1.DB.query('SELECT  `name`, `username`, `profile_img` FROM `users` WHERE `ID`=' + req.params.id));
        const data = yield (call === null || call === void 0 ? void 0 : call.result[0]);
        res.send(data);
    }));
}
exports.default = UserComponent;
