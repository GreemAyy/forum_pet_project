interface IPost{
    channel:string
    id:string
    title:string
    text:string,
    media:Array<string|number>,
    timeCreate:any
}

export const createChannel=
({name,img,tags}:
{name:string,img:string[],tags:string[]})=>{
return `INSERT INTO channels (ID, name, description, profile_img, tags, subs) VALUES (null,'${name}','Нет описания','${JSON.stringify(img)}','${JSON.stringify(tags)}',0)`
}

export const createRoleQuery=( 
    {userID,role,channelID}:
    {userID:string,role:string,channelID:string})=>{
return `INSERT INTO roles (ID, user_id, where_id, role) VALUES (null,${userID},${channelID},'${role}')`
}

export const selectChannel=(id:string)=>{
    return 'SELECT * FROM `channels` WHERE ID='+id
}

export const getSubQuery=(user:string,channel:string)=>{
    return `SELECT * FROM roles WHERE user_id=${user} and where_id=${channel}`
}

export const incSub=(channel:string)=>{
    return 'UPDATE `channels` SET `subs`=`subs`+1 WHERE ID='+channel
}

export const decSub=(channel:string)=>{
    return 'UPDATE `channels` SET `subs`=`subs`-1 WHERE ID='+channel
}

export const deleteRoleQuery=(id:string,channel:string):string=>{
    return `DELETE FROM roles WHERE user_id=${id} and where_id=${channel}`
}

export const createPost=({channel, id,title,text, media, timeCreate}:IPost)=>
{
return `INSERT INTO post (ID, channel_child, creator_id, title, body, media, time_create, views, likes) VALUES (null,${channel},${id},'${title}','${text}','${JSON.stringify(media)}','${timeCreate}',0,0)`  
}

//{ channel: '20', id: '16', title: 'sadas', text: 'dasdsad' }

export const getPostQuery=(id:string)=>{
    return 'SELECT * FROM `post` WHERE ID = '+id
}

export const getPostLike=(post_id:string,user_id:string)=>{
    return `SELECT * FROM likes WHERE user_id = ${user_id} and where_id = ${post_id} and type='post'`
}

export const orderPost=(channel_id:string,limit:number)=>{
    if(channel_id!=='all')
        return `SELECT ID FROM post WHERE channel_child= ${channel_id} ORDER by views +likes DESC LIMIT ${Number(limit-10)} ,${limit}`
    else
        return `SELECT ID FROM post ORDER by views +likes DESC LIMIT ${Number(limit-10)} ,${limit}`
    }

export const createLike=(type:string,user:string,where:string)=>{
    return `INSERT INTO likes (ID, user_id, where_id, type) VALUES (null,${user},${where},'${type}')`
}

export const deleteLike=(type:string,user:string,where:string)=>{
    return `DELETE FROM likes WHERE user_id=${user} and where_id=${where} and type ='${type}'`
}

export const changeLike=(incOrDec:string,post:string)=>{
return `UPDATE post SET likes=${incOrDec==='inc'?'likes+1':'likes-1'} WHERE ID = ${post}`
}

export const incView=(post_id:string)=>{
    return `UPDATE post SET views=views+1 WHERE ID=`+post_id
}

export const createMessageQuery=(
    {creator,body,post,media,time,type,resend}
    :{creator:string,
    body:string,
    post:string,
    media:string[],
    time:string,
    type:string,
    resend:string})=>{
        return `INSERT INTO messages (id, creator_id, body, post_id, media, time_create, type, resend_id, likes, status) VALUES (null,${creator},'${body}',${post},'${JSON.stringify(media)}','${time}','${type}',${resend},0,200)`
    }

export const getMessagesQuery=(post:string,limit:string|null)=>{
    if(limit==null)
        return `SELECT * FROM messages WHERE post_id=${post} and type='single' order by likes DESC`
    else
        return `SELECT * FROM messages WHERE post_id=${post} and type='single' order by likes DESC limit ${Number(limit)-30} ,${limit}`
}

export const getLikeMessageQuery=(user:string,where:string)=>{
    return `SELECT * FROM likes WHERE user_id=${user} AND where_id=${where} AND type='message'`
}

export const getLikeMessage=(user:string,where:string)=>{
    return `SELECT ID FROM likes WHERE user_id=${user} and where_id=${where} and type='message'`
}

export const getRequests=(message:string)=>{
    return "SELECT * FROM `messages` WHERE `resend_id`="+message
}