interface IReg{
    name:string
    username:string
    password:string
}

export const createUserAuthQuery=({name,username,password}:IReg):string=>{
    return `INSERT INTO users(ID, name, username, password, profile_img, hash) VALUES (null,'${name}','${username}','${password}','[]','')`
}
export const checkUserAuthQuery=(username:string):string=>{
    return `SELECT ID FROM users WHERE username = '${username}'`
}
export const setHashAuthQuery=(hash:string,id:number):string=>{
    return "UPDATE `users` set `hash`='"+hash+"' WHERE ID="+`'${id}'`
}
export const selectUserAuthQuery=(username:string,password:string)=>{
    return `SELECT ID FROM users WHERE username='${username}' and password = '${password}'`
}
export const getUserQuery=(id:string,hash:string):string=>{
    return "SELECT `ID`, `name`, `username`, `profile_img`, `hash` FROM `users` WHERE ID="+id+" and hash ='"+hash+"'"
}

export const searchQuery=(like:string)=>{
    return 'SELECT `ID`, `name`, `username`, `profile_img` FROM `users` WHERE `username` like "%'+like+'%" limit 0,5'
}

export const searchLikePost = (like:string)=>{
    return `SELECT ID, title, body profile_img FROM post WHERE title like "%${like}%" or body like "%${like}%" limit 0,5`
}

export const searchChannelLike=(like:string)=>{
    return `SELECT ID, name, tags FROM channels WHERE name like "%${like}%" or tags like "%${like}%" limit 0,5`
}