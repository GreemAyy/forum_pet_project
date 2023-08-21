"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.app = exports.DB = exports.WS = exports.HTTP = void 0;
const HTTP_1 = __importDefault(require("./connections/HTTP"));
const WS_1 = __importDefault(require("./connections/WS"));
const DB_1 = __importDefault(require("./connections/DB"));
const auth_component_1 = __importDefault(require("./components/auth.component"));
const user_component_1 = __importDefault(require("./components/user.component"));
const search_component_1 = __importDefault(require("./components/search.component"));
const channel_component_1 = __importDefault(require("./components/channel.component"));
const media_component_1 = __importDefault(require("./components/media.component"));
const post_component_1 = __importDefault(require("./components/post.component"));
const message_component_1 = __importDefault(require("./components/message.component"));
exports.HTTP = (() => {
    const HTTP = new HTTP_1.default(4000);
    HTTP.connect();
    return HTTP;
})();
exports.WS = (() => {
    const WS = new WS_1.default(exports.HTTP.app);
    const aWSS = WS.aWSS;
    return { WS, aWSS };
})();
exports.DB = (() => {
    const database = new DB_1.default({
        host: "localhost",
        user: "root",
        password: "",
        database: "M",
    });
    database.connect();
    return database;
})();
exports.app = exports.HTTP.app;
const App = () => {
    console.clear();
    (0, auth_component_1.default)();
    (0, user_component_1.default)();
    (0, search_component_1.default)();
    (0, channel_component_1.default)();
    (0, media_component_1.default)();
    (0, post_component_1.default)();
    (0, message_component_1.default)();
};
exports.App = App;
