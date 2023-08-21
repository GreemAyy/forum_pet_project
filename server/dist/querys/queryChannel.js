"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequests = exports.getLikeMessage = exports.getLikeMessageQuery = exports.getMessagesQuery = exports.createMessageQuery = exports.incView = exports.changeLike = exports.deleteLike = exports.createLike = exports.orderPost = exports.getPostLike = exports.getPostQuery = exports.createPost = exports.deleteRoleQuery = exports.decSub = exports.incSub = exports.getSubQuery = exports.selectChannel = exports.createRoleQuery = exports.createChannel = void 0;
const createChannel = ({ name, img, tags }) => {
    return `INSERT INTO channels (ID, name, description, profile_img, tags, subs) VALUES (null,'${name}','Нет описания','${JSON.stringify(img)}','${JSON.stringify(tags)}',0)`;
};
exports.createChannel = createChannel;
const createRoleQuery = ({ userID, role, channelID }) => {
    return `INSERT INTO roles (ID, user_id, where_id, role) VALUES (null,${userID},${channelID},'${role}')`;
};
exports.createRoleQuery = createRoleQuery;
const selectChannel = (id) => {
    return 'SELECT * FROM `channels` WHERE ID=' + id;
};
exports.selectChannel = selectChannel;
const getSubQuery = (user, channel) => {
    return `SELECT * FROM roles WHERE user_id=${user} and where_id=${channel}`;
};
exports.getSubQuery = getSubQuery;
const incSub = (channel) => {
    return 'UPDATE `channels` SET `subs`=`subs`+1 WHERE ID=' + channel;
};
exports.incSub = incSub;
const decSub = (channel) => {
    return 'UPDATE `channels` SET `subs`=`subs`-1 WHERE ID=' + channel;
};
exports.decSub = decSub;
const deleteRoleQuery = (id, channel) => {
    return `DELETE FROM roles WHERE user_id=${id} and where_id=${channel}`;
};
exports.deleteRoleQuery = deleteRoleQuery;
const createPost = ({ channel, id, title, text, media, timeCreate }) => {
    return `INSERT INTO post (ID, channel_child, creator_id, title, body, media, time_create, views, likes) VALUES (null,${channel},${id},'${title}','${text}','${JSON.stringify(media)}','${timeCreate}',0,0)`;
};
exports.createPost = createPost;
//{ channel: '20', id: '16', title: 'sadas', text: 'dasdsad' }
const getPostQuery = (id) => {
    return 'SELECT * FROM `post` WHERE ID = ' + id;
};
exports.getPostQuery = getPostQuery;
const getPostLike = (post_id, user_id) => {
    return `SELECT * FROM likes WHERE user_id = ${user_id} and where_id = ${post_id} and type='post'`;
};
exports.getPostLike = getPostLike;
const orderPost = (channel_id, limit) => {
    if (channel_id !== 'all')
        return `SELECT ID FROM post WHERE channel_child= ${channel_id} ORDER by views +likes DESC LIMIT ${Number(limit - 10)} ,${limit}`;
    else
        return `SELECT ID FROM post ORDER by views +likes DESC LIMIT ${Number(limit - 10)} ,${limit}`;
};
exports.orderPost = orderPost;
const createLike = (type, user, where) => {
    return `INSERT INTO likes (ID, user_id, where_id, type) VALUES (null,${user},${where},'${type}')`;
};
exports.createLike = createLike;
const deleteLike = (type, user, where) => {
    return `DELETE FROM likes WHERE user_id=${user} and where_id=${where} and type ='${type}'`;
};
exports.deleteLike = deleteLike;
const changeLike = (incOrDec, post) => {
    return `UPDATE post SET likes=${incOrDec === 'inc' ? 'likes+1' : 'likes-1'} WHERE ID = ${post}`;
};
exports.changeLike = changeLike;
const incView = (post_id) => {
    return `UPDATE post SET views=views+1 WHERE ID=` + post_id;
};
exports.incView = incView;
const createMessageQuery = ({ creator, body, post, media, time, type, resend }) => {
    return `INSERT INTO messages (id, creator_id, body, post_id, media, time_create, type, resend_id, likes, status) VALUES (null,${creator},'${body}',${post},'${JSON.stringify(media)}','${time}','${type}',${resend},0,200)`;
};
exports.createMessageQuery = createMessageQuery;
const getMessagesQuery = (post, limit) => {
    if (limit == null)
        return `SELECT * FROM messages WHERE post_id=${post} and type='single' order by likes DESC`;
    else
        return `SELECT * FROM messages WHERE post_id=${post} and type='single' order by likes DESC limit ${Number(limit) - 30} ,${limit}`;
};
exports.getMessagesQuery = getMessagesQuery;
const getLikeMessageQuery = (user, where) => {
    return `SELECT * FROM likes WHERE user_id=${user} AND where_id=${where} AND type='message'`;
};
exports.getLikeMessageQuery = getLikeMessageQuery;
const getLikeMessage = (user, where) => {
    return `SELECT ID FROM likes WHERE user_id=${user} and where_id=${where} and type='message'`;
};
exports.getLikeMessage = getLikeMessage;
const getRequests = (message) => {
    return "SELECT * FROM `messages` WHERE `resend_id`=" + message;
};
exports.getRequests = getRequests;
