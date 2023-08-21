import { DB, app } from "../App"
import { uploadFile ,addFile} from "./channel.component"
import { createMessageQuery,
        getLikeMessageQuery,
        getMessagesQuery, 
        getLikeMessage,
        getRequests} from "../querys/queryChannel"

const MessageComponent=()=>{
    app.post('/api/message/create',async(req,res)=>{
        const dataForm = JSON.parse(req.body.data)
        const medias:number[]=[]
        const files = req.files?.file?.length==undefined?[req.files?.file]:req.files?.file
        dataForm.media=[]
        const addFiles= async(i:number)=>{
            //@ts-ignore
            const data = await addFile( files[i])
            const upload = await uploadFile({
                                name:data.name,
                                id:dataForm.creator,
                                type:data.type})
            return data.id+1
        }
        if(files[0]!=undefined)
            await (async()=>{
            let req;
            //@ts-ignore
            for (let i = 0; i <  files.length; i++) {
             const id = await addFiles(i);
             medias.push(id)
                //@ts-ignore
                if(medias.length== files.length){
                    dataForm.media=medias
                    req = await createMessage(dataForm)
                    return req
            }}})()
            .then(data=>res.send({id:data?.result?.insertId}))
        else
            await createMessage(dataForm)
            .then(data=>res.send({id:data?.result?.insertId}))
    }) 
    app.get('/api/message/get/:post/:id/:limit',async(req,res)=>{
        const post = req.params.post
        const id = req.params.id
        const limit =req.params.limit=='null'?null:req.params.limit
        const query= await DB.query(getMessagesQuery(post,limit:limit))
        const result = await query.result
        const list = await getLikeToPost(result,id)
        res.send(list)
    })  
    app.get('/api/message/single/:message/:user',async(req,res)=>{
        const post = await DB.query('SELECT * FROM `messages` WHERE id='+req.params.message)
        //@ts-ignore
        const result = post?.result
        const getPostLike = await getLikeToPost(result,req.params.user)
        res.send(getPostLike[0])
    }) 
    app.get('/api/message/like/:message/:user',async(req,res)=>{
        const user = req.params.user
        const message = req.params.message
        const check= await DB.query(getLikeMessage(user,message))
        const id = await check?.result[0]?.ID??0
        if(id)await DB.query(`DELETE FROM likes WHERE ID=${id}`)    
        else await DB.query(`INSERT INTO likes (ID, user_id, where_id, type) VALUES (null,${user},${message},'message')`)
        await DB.query(
            `UPDATE messages SET likes=likes${id?'-1':'+1'} WHERE id=${message}`
        )
        res.send({status:!id?200:400})
    })
    app.get('/api/message/status/:message/:status',async(req,res)=>{
        const change = await DB.query(`UPDATE messages SET status=${req.params.status} WHERE id=${req.params.message}`)
        res.send({status:200})
    })
    app.get('/api/message/get-resend/:message/:user',async(req,res)=>{
        const reqs=await DB.query(getRequests(req.params.message))
        const list = await reqs?.result.length>0? getLikeToPost(reqs?.result,req.params.user):[]
        res.send(await list)
    })
} 

const getLikeToPost=async(posts:any,user:string)=>{
    const result =  await (async()=>{
        const total = []
        for(let i =0;i<posts.length;i++){ 
            total.push({message:posts[i],like:await getLike(user,posts[i].id)})
        }
        return total
        })()
    return result
}

const getLike=async(user:string,where:string)=>{
    const req = await DB.query(getLikeMessageQuery(user,where))
    return req?.result.length>0?true:false
}
export const createMessage=async(param:any)=>{
    const querys=createMessageQuery({
        creator:param.creator,
        body:param.body,
        post:param.post,
        media:param.media,
        time:new Date().toUTCString(),
        type:param.type,
        resend:param.resend 
    })
    const query = await DB.query(querys)
    return query
}

export default MessageComponent