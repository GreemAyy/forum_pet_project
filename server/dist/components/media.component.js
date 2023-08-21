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
exports.MediaComponent = void 0;
const App_1 = require("../App");
const MediaComponent = () => {
    App_1.app.get('/api/media/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const DBreq = yield App_1.DB.query('SELECT * FROM `media` WHERE ID=' + req.params.id);
        res.sendFile('I:/a/server/media/' + (
        //@ts-ignore
        (DBreq === null || DBreq === void 0 ? void 0 : DBreq.result.length) > 0 ?
            //@ts-ignore
            DBreq === null || DBreq === void 0 ? void 0 : DBreq.result[0].name :
            '404.png'));
    }));
    App_1.app.post('/api/get-media-data', (req, res) => {
    });
};
exports.MediaComponent = MediaComponent;
exports.default = exports.MediaComponent;
