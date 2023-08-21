"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMedia = void 0;
const uploadMedia = ({ id, name, type }) => {
    return `INSERT INTO media (ID, creator_id, name, type, status) VALUES (null,${id},'${name}','${type}','200')`;
};
exports.uploadMedia = uploadMedia;
