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
const SearchComponent = () => {
    App_1.app.get('/api/search/:like', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqUser = yield App_1.DB.query((0, queryAuth_1.searchQuery)(req.params.like));
        const reqPost = yield App_1.DB.query((0, queryAuth_1.searchLikePost)(req.params.like));
        const reqChannel = yield App_1.DB.query((0, queryAuth_1.searchChannelLike)(req.params.like));
        res.send({
            user: reqUser === null || reqUser === void 0 ? void 0 : reqUser.result,
            post: reqPost === null || reqPost === void 0 ? void 0 : reqPost.result,
            channel: reqChannel === null || reqChannel === void 0 ? void 0 : reqChannel.result
        });
    }));
};
exports.default = SearchComponent;
