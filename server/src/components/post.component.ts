import { DB, app } from "../App"
import { changeLike, createLike, createPost, deleteLike, getPostLike, getPostQuery, incView, orderPost } from "../querys/queryChannel"
import { addFile, uploadFile } from "./channel.component"


const PostComponent=()=>{
    app.post('/api/create-post/',(req,res)=>{
        const dataForm = JSON.parse(req.body.data)
        const medias:number[]=[]
        const files = req.files?.file?.length==undefined?[req.files?.file]:req.files?.file
        
        const addFiles= async(i:number)=>{
            //@ts-ignore
            const data = await addFile(files[i])
            const upload = await uploadFile({
                                name:data.name,
                                id:dataForm.id,
                                type:data.type})
            return data.id
        }
        async function asyncLoop() {
            let req;
            //@ts-ignore
            for (let i = 0; i <  files.length; i++) {
             const id = await addFiles(i);
             medias.push(id)
                //@ts-ignore
                if(medias.length== files.length){
                        console.log(medias)
                        req = await DB.query(createPost({
                        channel:dataForm.channel,
                        id:dataForm.id,
                        title:dataForm.title,
                        text:dataForm.text,
                        media:medias.map(item=>item+1),
                        timeCreate:new Date().toUTCString()
                    }))
                    return req
                }
            }
        }
        if(files[0]!==undefined)
            asyncLoop()
            .then(data=>
                res.send({
                    status:200,
                    id:data?.result?.insertId
                }))    
        else
            (async()=>{
               const req = await DB.query(createPost({
                    channel:dataForm.channel,
                    id:dataForm.id,
                    title:dataForm.title,
                    text:dataForm.text,
                    media:[],
                    timeCreate:new Date().toUTCString()
                }))
                return req
            })()
            .then(data=>
                res.send({
                    status:200,
                    id:data?.result?.insertId})
                )  
        
    })
    app.get('/api/get-post/:id/:user',async(req,res)=>{
        const singlePostAndLike = await getPost(req.params.id,req.params.user)
        res.send(singlePostAndLike)
    })
    app.get('/api/get-post-all/:channel/:like/:limit'
    ,async(req,res)=>{
        const order = await DB.query(orderPost(req.params.channel,Number(req.params.limit)))
        const IDS=await order?.result.map(item=>item.ID)
        const total = []
        for(let i = 0;i<IDS.length;i++){
            const post = await getPost(IDS[i],req.params.like)
            total.push(post)
            if(i===IDS.length-1)
                res.send(total)
        }
        if(IDS?.length==0)
            res.send([])
        
    })
    app.get('/api/set-like/:post/:user',async(req,res)=>{
        const check=await DB.query(getPostLike(req.params.post,req.params.user))
        const isZero= check?.result.length==0
        if(!isZero)
            await DB.query(deleteLike('post',req.params.user,req.params.post))
        else
            await DB.query(createLike('post',req.params.user,req.params.post))
        await DB.query(changeLike((isZero?'inc':'dec'),req.params.post))
        res.send({status:200})
    })
}

const getPost=async(post_id:string,user_id:string)=>{
    const post = await DB.query(getPostQuery(post_id))
    const like = await DB.query(getPostLike(post_id,user_id))
    await DB.query(incView(post_id))
    return {post,like}
}

export default PostComponent