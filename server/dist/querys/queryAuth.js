"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchChannelLike = exports.searchLikePost = exports.searchQuery = exports.getUserQuery = exports.selectUserAuthQuery = exports.setHashAuthQuery = exports.checkUserAuthQuery = exports.createUserAuthQuery = void 0;
const createUserAuthQuery = ({ name, username, password }) => {
    return `INSERT INTO users(ID, name, username, password, profile_img, hash) VALUES (null,'${name}','${username}','${password}','[]','')`;
};
exports.createUserAuthQuery = createUserAuthQuery;
const checkUserAuthQuery = (username) => {
    return `SELECT ID FROM users WHERE username = '${username}'`;
};
exports.checkUserAuthQuery = checkUserAuthQuery;
const setHashAuthQuery = (hash, id) => {
    return "UPDATE `users` set `hash`='" + hash + "' WHERE ID=" + `'${id}'`;
};
exports.setHashAuthQuery = setHashAuthQuery;
const selectUserAuthQuery = (username, password) => {
    return `SELECT ID FROM users WHERE username='${username}' and password = '${password}'`;
};
exports.selectUserAuthQuery = selectUserAuthQuery;
const getUserQuery = (id, hash) => {
    return "SELECT `ID`, `name`, `username`, `profile_img`, `hash` FROM `users` WHERE ID=" + id + " and hash ='" + hash + "'";
};
exports.getUserQuery = getUserQuery;
const searchQuery = (like) => {
    return 'SELECT `ID`, `name`, `username`, `profile_img` FROM `users` WHERE `username` like "%' + like + '%" limit 0,5';
};
exports.searchQuery = searchQuery;
const searchLikePost = (like) => {
    return `SELECT ID, title, body profile_img FROM post WHERE title like "%${like}%" or body like "%${like}%" limit 0,5`;
};
exports.searchLikePost = searchLikePost;
const searchChannelLike = (like) => {
    return `SELECT ID, name, tags FROM channels WHERE name like "%${like}%" or tags like "%${like}%" limit 0,5`;
};
exports.searchChannelLike = searchChannelLike;
