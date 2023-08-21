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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRole = exports.uploadFile = exports.addFile = exports.getSub = exports.getChannel = exports.deleteRole = void 0;
const App_1 = require("../App");
const path_1 = __importDefault(require("path"));
const mime_1 = __importDefault(require("mime"));
const queryFile_1 = require("../querys/queryFile");
const queryChannel_1 = require("../querys/queryChannel");
const ChannelComponent = () => {
    App_1.app.post('/api/create/channel', (req, res) => {
        const dataForm = JSON.parse(req.body.data);
        //@ts-ignore
        (0, exports.addFile)(req.files.file)
            .then(data => {
            (0, exports.uploadFile)({ name: data.name,
                id: dataForm.creator,
                type: data.type });
            uploadChannel({ name: dataForm.name,
                img: [data.id + 1],
                tags: dataForm.tag,
                creator: dataForm.creator
            }).then(data => res.send(data));
        });
    });
    App_1.app.get('/api/channel/:id/:sub', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const channel = yield (0, exports.getChannel)(req.params.id);
        const sub = yield (0, exports.getSub)(req.params.sub, req.params.id);
        res.send({ channel, sub });
    }));
    App_1.app.get('/api/sub/:channel/:user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const check = yield (0, exports.getSub)(req.params.user, req.params.channel);
        if (check.status == 200)
            unsub(req.params.user, req.params.channel);
        else
            sub(req.params.user, req.params.channel);
        res.send({ status: 200 });
    }));
    App_1.app.get('/api/get-user-channels/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const roles = yield getRoles(req.params.id);
        const totalRoles = yield roles.map(item => item.where_id);
        const total = [];
        yield (() => __awaiter(void 0, void 0, void 0, function* () {
            if (!(totalRoles === null || totalRoles === void 0 ? void 0 : totalRoles.length))
                res.send({ status: 400 });
            for (let i = 0; i < totalRoles.length; i++) {
                const data = yield (0, exports.getChannel)(totalRoles[i], true);
                total.push(data === null || data === void 0 ? void 0 : data.result);
                if (i == totalRoles.length - 1)
                    res.send({ result: total, status: 200 });
            }
        }))();
    }));
    App_1.app.get('/api/get-channel-info/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const data = yield App_1.DB.query('SELECT `ID`, `name`,`description`,  `profile_img`, `subs` FROM `channels` WHERE ID=' + req.params.id);
        res.send((_a = data === null || data === void 0 ? void 0 : data.result) === null || _a === void 0 ? void 0 : _a[0]);
    }));
};
const getRoles = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield App_1.DB.query('SELECT  `where_id` FROM `roles` WHERE user_id=' + id);
    return yield (req === null || req === void 0 ? void 0 : req.result);
});
const sub = (user_id, channel_id) => __awaiter(void 0, void 0, void 0, function* () {
    const sub = yield App_1.DB.query((0, queryChannel_1.incSub)(channel_id));
    const subUser = yield (0, exports.createRole)({ userID: user_id,
        role: 'common',
        channelID: channel_id });
});
const unsub = (user_id, channel_id) => __awaiter(void 0, void 0, void 0, function* () {
    const unsub = yield App_1.DB.query((0, queryChannel_1.decSub)(channel_id));
    const unsubRole = yield (0, exports.deleteRole)(user_id, channel_id);
});
const deleteRole = (user_id, channel_id) => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield App_1.DB.query((0, queryChannel_1.deleteRoleQuery)(user_id, channel_id));
});
exports.deleteRole = deleteRole;
const getChannel = (id, low = false) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let req;
    if (!low)
        req = yield App_1.DB.query((0, queryChannel_1.selectChannel)(id));
    else
        req = yield App_1.DB.query('SELECT `ID`, `name`, `profile_img` FROM `channels` WHERE ID=' + id);
    //@ts-ignore
    if ((req === null || req === void 0 ? void 0 : req.result.length) > 0)
        return { result: (_a = req === null || req === void 0 ? void 0 : req.result) === null || _a === void 0 ? void 0 : _a[0], status: 200 };
    else
        return { status: 404 };
});
exports.getChannel = getChannel;
const getSub = (user_id, channel_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const req = yield App_1.DB.query((0, queryChannel_1.getSubQuery)(user_id, channel_id));
    //@ts-ignore
    if (((_b = req === null || req === void 0 ? void 0 : req.result) === null || _b === void 0 ? void 0 : _b.length) > 0)
        return { result: (_c = req === null || req === void 0 ? void 0 : req.result) === null || _c === void 0 ? void 0 : _c[0], status: 200 };
    else
        return { status: 404 };
});
exports.getSub = getSub;
const addFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const query = yield App_1.DB.query('SELECT MAX(`ID`) FROM `media`');
    //@ts-ignore
    const id = yield ((_d = query === null || query === void 0 ? void 0 : query.result[0]) === null || _d === void 0 ? void 0 : _d['MAX(`ID`)']);
    const fileExt = path_1.default.extname(file.name);
    const fileType = mime_1.default.lookup(file.name);
    const pathname = "I:/a/server/media/" + id + fileExt;
    const req = yield file.mv(pathname, (err) => { if (err)
        console.log(err); });
    return {
        id,
        name: id + fileExt,
        ext: fileExt,
        type: fileType
    };
});
exports.addFile = addFile;
const uploadFile = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield App_1.DB.query((0, queryFile_1.uploadMedia)(
    //@ts-ignore
    { id: data.id, name: data.name, type: data.type }));
});
exports.uploadFile = uploadFile;
const uploadChannel = ({ name, img, tags, creator }) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const channel = yield App_1.DB.query((0, queryChannel_1.createChannel)({ name, img, tags }));
    //@ts-ignore
    const id = yield ((_e = channel === null || channel === void 0 ? void 0 : channel.result) === null || _e === void 0 ? void 0 : _e.insertId);
    const role = yield (0, exports.createRole)({ userID: creator, role: "creator", channelID: id });
    return { id, roleID: role, status: 200 };
});
const createRole = ({ userID, role, channelID }) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const _role = yield App_1.DB.query((0, queryChannel_1.createRoleQuery)({ userID, role, channelID }));
    //@ts-ignore
    const id = yield ((_f = _role === null || _role === void 0 ? void 0 : _role.result) === null || _f === void 0 ? void 0 : _f.insertId);
    return id;
});
exports.createRole = createRole;
exports.default = ChannelComponent;
