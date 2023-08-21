import { app ,DB} from "../App"
import path from 'path'
import mime from 'mime'
import { uploadMedia } from "../querys/queryFile"
import { createChannel, 
         createRoleQuery, 
         decSub, 
         getSubQuery, 
         selectChannel,
         deleteRoleQuery, 
         incSub} from "../querys/queryChannel"

const ChannelComponent=()=>{
    app.post('/api/create/channel',(req,res)=>{
        const dataForm = JSON.parse(req.body.data)
        //@ts-ignore
        addFile(req.files.file)
        .then(data=>{
            uploadFile({name:data.name,
                        id:dataForm.creator,
                        type:data.type})
            uploadChannel({ name:dataForm.name,
                            img:[data.id+1],
                            tags:dataForm.tag,
                            creator:dataForm.creator
                        }).then(data=>res.send(data))
        })
    })
    app.get('/api/channel/:id/:sub',async(req,res)=>{
        const channel = await getChannel(req.params.id)
        const sub = await getSub(req.params.sub,req.params.id)
        res.send({channel,sub})
    })
    app.get('/api/sub/:channel/:user',async(req,res)=>{
        const check= await getSub(req.params.user,req.params.channel)
        if(check.status==200)
            unsub(req.params.user,req.params.channel)
        else
            sub(req.params.user,req.params.channel)  
        res.send({status:200})
    })

    app.get('/api/get-user-channels/:id',async(req,res)=>{
        const roles = await getRoles(req.params.id)
        const totalRoles = await roles.map(item=>item.where_id)
        const total=[];
        await (async()=>{
            if(!totalRoles?.length)
                res.send({status:400})
            for(let i = 0;i< totalRoles.length;i++){
                const data= await getChannel(totalRoles[i],true)
                total.push(data?.result)
                if(i==totalRoles.length-1)
                    res.send({result:total,status:200})
            }
        })()
    })
    app.get('/api/get-channel-info/:id',async(req,res)=>{
        const data = await DB.query('SELECT `ID`, `name`,`description`,  `profile_img`, `subs` FROM `channels` WHERE ID='+req.params.id)
        res.send(data?.result?.[0])
    })
}



const getRoles = async(id:string)=>{
    const req = await DB.query('SELECT  `where_id` FROM `roles` WHERE user_id='+id)
    return await req?.result
}

const sub=async(user_id:string,channel_id:string)=>{
    const sub = await DB.query(incSub(channel_id))
    const subUser= await createRole({userID:user_id,
                                     role:'common',
                                     channelID:channel_id})
    
}
const unsub=async(user_id:string,channel_id:string)=>{
    const unsub = await DB.query(decSub(channel_id))
    const unsubRole= await deleteRole(user_id,channel_id)
}
export const deleteRole= async(user_id:string,channel_id:string)=>{
    const req = await DB.query(deleteRoleQuery(user_id,channel_id))
}
export const getChannel=async(id:string,low:boolean=false)=>{
    let req
    if(!low) req=await DB.query(selectChannel(id))
    else req =await DB.query('SELECT `ID`, `name`, `profile_img` FROM `channels` WHERE ID='+id)
    //@ts-ignore
    if(req?.result.length>0) return {result:req?.result?.[0],status:200}
    else return {status:404}
}
export const getSub=async(user_id:string,channel_id:string)=>{
    const req = await DB.query(getSubQuery(user_id,channel_id))
    //@ts-ignore
    if(req?.result?.length>0) return {result:req?.result?.[0],status:200}
    else return {status:404}
}
export const addFile=async(file:any)=>{
    const query = await DB.query('SELECT MAX(`ID`) FROM `media`')
    //@ts-ignore
    const id = await query?.result[0]?.['MAX(`ID`)']
    const fileExt= path.extname(file.name) 
    const fileType = mime.lookup(file.name)
    const pathname = "I:/a/server/media/"+id+fileExt
    const req =await file.mv(pathname,(err:any)=>{if(err) console.log(err)})
    return {
        id,
        name:id+fileExt,
        ext:fileExt,
        type:fileType
    }
}
export const uploadFile=async(data:any)=>{
    const query= await  DB.query(uploadMedia(
         //@ts-ignore
        {id:data.id,name:data.name,type:data.type}))
}
const uploadChannel=async(
{name,img,tags,creator}:
{name:string,img:string[],tags:string[],creator:string})=>{
    const channel = await DB.query(createChannel({name,img,tags}))
    //@ts-ignore
    const id = await channel?.result?.insertId
    const role = await createRole({userID:creator,role:"creator",channelID:id})
    return {id,roleID:role,status:200}
}
export const createRole=async(
    {userID,role,channelID}:
    {userID:string,role:string,channelID:string}
)=>{
    const _role= await DB.query(createRoleQuery({userID,role,channelID}))
    //@ts-ignore
    const id = await _role?.result?.insertId
    return id
}

export default ChannelComponent