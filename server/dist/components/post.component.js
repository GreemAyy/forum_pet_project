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
const queryChannel_1 = require("../querys/queryChannel");
const channel_component_1 = require("./channel.component");
const PostComponent = () => {
    App_1.app.post('/api/create-post/', (req, res) => {
        var _a, _b, _c, _d;
        const dataForm = JSON.parse(req.body.data);
        const medias = [];
        const files = ((_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file) === null || _b === void 0 ? void 0 : _b.length) == undefined ? [(_c = req.files) === null || _c === void 0 ? void 0 : _c.file] : (_d = req.files) === null || _d === void 0 ? void 0 : _d.file;
        const addFiles = (i) => __awaiter(void 0, void 0, void 0, function* () {
            //@ts-ignore
            const data = yield (0, channel_component_1.addFile)(files[i]);
            const upload = yield (0, channel_component_1.uploadFile)({
                name: data.name,
                id: dataForm.id,
                type: data.type
            });
            return data.id;
        });
        function asyncLoop() {
            return __awaiter(this, void 0, void 0, function* () {
                let req;
                //@ts-ignore
                for (let i = 0; i < files.length; i++) {
                    const id = yield addFiles(i);
                    medias.push(id);
                    //@ts-ignore
                    if (medias.length == files.length) {
                        console.log(medias);
                        req = yield App_1.DB.query((0, queryChannel_1.createPost)({
                            channel: dataForm.channel,
                            id: dataForm.id,
                            title: dataForm.title,
                            text: dataForm.text,
                            media: medias.map(item => item + 1),
                            timeCreate: new Date().toUTCString()
                        }));
                        return req;
                    }
                }
            });
        }
        if (files[0] !== undefined)
            asyncLoop()
                .then(data => {
                var _a;
                return res.send({
                    status: 200,
                    id: (_a = data === null || data === void 0 ? void 0 : data.result) === null || _a === void 0 ? void 0 : _a.insertId
                });
            });
        else
            (() => __awaiter(void 0, void 0, void 0, function* () {
                const req = yield App_1.DB.query((0, queryChannel_1.createPost)({
                    channel: dataForm.channel,
                    id: dataForm.id,
                    title: dataForm.title,
                    text: dataForm.text,
                    media: [],
                    timeCreate: new Date().toUTCString()
                }));
                return req;
            }))()
                .then(data => {
                var _a;
                return res.send({
                    status: 200,
                    id: (_a = data === null || data === void 0 ? void 0 : data.result) === null || _a === void 0 ? void 0 : _a.insertId
                });
            });
    });
    App_1.app.get('/api/get-post/:id/:user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const singlePostAndLike = yield getPost(req.params.id, req.params.user);
        res.send(singlePostAndLike);
    }));
    App_1.app.get('/api/get-post-all/:channel/:like/:limit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield App_1.DB.query((0, queryChannel_1.orderPost)(req.params.channel, Number(req.params.limit)));
        const IDS = yield (order === null || order === void 0 ? void 0 : order.result.map(item => item.ID));
        const total = [];
        for (let i = 0; i < IDS.length; i++) {
            const post = yield getPost(IDS[i], req.params.like);
            total.push(post);
            if (i === IDS.length - 1)
                res.send(total);
        }
        if ((IDS === null || IDS === void 0 ? void 0 : IDS.length) == 0)
            res.send([]);
    }));
    App_1.app.get('/api/set-like/:post/:user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const check = yield App_1.DB.query((0, queryChannel_1.getPostLike)(req.params.post, req.params.user));
        const isZero = (check === null || check === void 0 ? void 0 : check.result.length) == 0;
        if (!isZero)
            yield App_1.DB.query((0, queryChannel_1.deleteLike)('post', req.params.user, req.params.post));
        else
            yield App_1.DB.query((0, queryChannel_1.createLike)('post', req.params.user, req.params.post));
        yield App_1.DB.query((0, queryChannel_1.changeLike)((isZero ? 'inc' : 'dec'), req.params.post));
        res.send({ status: 200 });
    }));
};
const getPost = (post_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield App_1.DB.query((0, queryChannel_1.getPostQuery)(post_id));
    const like = yield App_1.DB.query((0, queryChannel_1.getPostLike)(post_id, user_id));
    yield App_1.DB.query((0, queryChannel_1.incView)(post_id));
    return { post, like };
});
exports.default = PostComponent;
