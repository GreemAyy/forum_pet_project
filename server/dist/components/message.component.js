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
exports.createMessage = void 0;
const App_1 = require("../App");
const channel_component_1 = require("./channel.component");
const queryChannel_1 = require("../querys/queryChannel");
const MessageComponent = () => {
    App_1.app.post('/api/message/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const dataForm = JSON.parse(req.body.data);
        const medias = [];
        const files = ((_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file) === null || _b === void 0 ? void 0 : _b.length) == undefined ? [(_c = req.files) === null || _c === void 0 ? void 0 : _c.file] : (_d = req.files) === null || _d === void 0 ? void 0 : _d.file;
        dataForm.media = [];
        const addFiles = (i) => __awaiter(void 0, void 0, void 0, function* () {
            //@ts-ignore
            const data = yield (0, channel_component_1.addFile)(files[i]);
            const upload = yield (0, channel_component_1.uploadFile)({
                name: data.name,
                id: dataForm.creator,
                type: data.type
            });
            return data.id + 1;
        });
        if (files[0] != undefined)
            yield (() => __awaiter(void 0, void 0, void 0, function* () {
                let req;
                //@ts-ignore
                for (let i = 0; i < files.length; i++) {
                    const id = yield addFiles(i);
                    medias.push(id);
                    //@ts-ignore
                    if (medias.length == files.length) {
                        dataForm.media = medias;
                        req = yield (0, exports.createMessage)(dataForm);
                        return req;
                    }
                }
            }))()
                .then(data => { var _a; return res.send({ id: (_a = data === null || data === void 0 ? void 0 : data.result) === null || _a === void 0 ? void 0 : _a.insertId }); });
        else
            yield (0, exports.createMessage)(dataForm)
                .then(data => { var _a; return res.send({ id: (_a = data === null || data === void 0 ? void 0 : data.result) === null || _a === void 0 ? void 0 : _a.insertId }); });
    }));
    App_1.app.get('/api/message/get/:post/:id/:limit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const post = req.params.post;
        const id = req.params.id;
        const limit = req.params.limit == 'null' ? null : req.params.limit;
        const query = yield App_1.DB.query((0, queryChannel_1.getMessagesQuery)(post, limit, limit));
        const result = yield query.result;
        const list = yield getLikeToPost(result, id);
        res.send(list);
    }));
    App_1.app.get('/api/message/single/:message/:user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield App_1.DB.query('SELECT * FROM `messages` WHERE id=' + req.params.message);
        //@ts-ignore
        const result = post === null || post === void 0 ? void 0 : post.result;
        const getPostLike = yield getLikeToPost(result, req.params.user);
        res.send(getPostLike[0]);
    }));
    App_1.app.get('/api/message/like/:message/:user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _e, _f;
        const user = req.params.user;
        const message = req.params.message;
        const check = yield App_1.DB.query((0, queryChannel_1.getLikeMessage)(user, message));
        const id = (_f = yield ((_e = check === null || check === void 0 ? void 0 : check.result[0]) === null || _e === void 0 ? void 0 : _e.ID)) !== null && _f !== void 0 ? _f : 0;
        if (id)
            yield App_1.DB.query(`DELETE FROM likes WHERE ID=${id}`);
        else
            yield App_1.DB.query(`INSERT INTO likes (ID, user_id, where_id, type) VALUES (null,${user},${message},'message')`);
        yield App_1.DB.query(`UPDATE messages SET likes=likes${id ? '-1' : '+1'} WHERE id=${message}`);
        res.send({ status: !id ? 200 : 400 });
    }));
    App_1.app.get('/api/message/status/:message/:status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const change = yield App_1.DB.query(`UPDATE messages SET status=${req.params.status} WHERE id=${req.params.message}`);
        res.send({ status: 200 });
    }));
    App_1.app.get('/api/message/get-resend/:message/:user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqs = yield App_1.DB.query((0, queryChannel_1.getRequests)(req.params.message));
        const list = (yield (reqs === null || reqs === void 0 ? void 0 : reqs.result.length)) > 0 ? getLikeToPost(reqs === null || reqs === void 0 ? void 0 : reqs.result, req.params.user) : [];
        res.send(yield list);
    }));
};
const getLikeToPost = (posts, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (() => __awaiter(void 0, void 0, void 0, function* () {
        const total = [];
        for (let i = 0; i < posts.length; i++) {
            total.push({ message: posts[i], like: yield getLike(user, posts[i].id) });
        }
        return total;
    }))();
    return result;
});
const getLike = (user, where) => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield App_1.DB.query((0, queryChannel_1.getLikeMessageQuery)(user, where));
    return (req === null || req === void 0 ? void 0 : req.result.length) > 0 ? true : false;
});
const createMessage = (param) => __awaiter(void 0, void 0, void 0, function* () {
    const querys = (0, queryChannel_1.createMessageQuery)({
        creator: param.creator,
        body: param.body,
        post: param.post,
        media: param.media,
        time: new Date().toUTCString(),
        type: param.type,
        resend: param.resend
    });
    const query = yield App_1.DB.query(querys);
    return query;
});
exports.createMessage = createMessage;
exports.default = MessageComponent;
