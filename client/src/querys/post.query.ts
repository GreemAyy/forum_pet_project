import { _URL } from "@/tools/URL"
import { mediaForm } from "./any.query"

export const getChannelPosts=async(
    channel:string,user:string,limit:number
)=>{
    const req = await fetch(_URL+`api/get-post-all/${channel}/${user}/${limit}`)
    const data = await req.json()
    return data?.length!==0?data:null
}

export const getNewSinglePost=
async(id:number|string,user:number|string)=>{
    const req = await fetch(_URL+`api/get-post/${id}/${user}`)
    const data = await req.json()
    return data
}

export const setLikeQuery=async(userId:string,postID:string)=>{
    const req = await fetch(_URL+`api/set-like/${postID}/${userId}`)
    return (req.json())
}

export const getSubs=async(id:string)=>{
    const req = await fetch(_URL+`api/get-user-channels/${id}`)
    return (req.json())
}

export const createMessageQuery=async(
    {creator,body,post,media,type,resend}:
    {creator:string|number
    body:string,
    post:string|number,
    media:File[],
    type:string,
    resend:string|number
    })=>{
        const formdata = mediaForm(media)
        formdata.append('data',JSON.stringify({
            creator,body,post,type,resend
        }))
        const req = await fetch(_URL+'api/message/create',{
            method:'POST',
            body:formdata
        })
        const data= await req.json()
        return data
}

export const getSingleMessage=async(id:string,user:string)=>{
    const req = await fetch(_URL+`api/message/single/${id}/${user}`)
    return req.json()    
}

export const getListQuery=async(
    post:string|number,
    user:string|number,
    limit:number|null=null)=>{
        const req = await fetch(_URL+`api/message/get/${post}/${user}/${limit}`)
        const data = await req.json()
        return data
    }   

export const setLikeMessage=async(message:string,user:string)=>{
    const req = await fetch(_URL+`api/message/like/${message}/${user}`)
    return (req.json())
}

export const changeStatus=async(message:string,status:number)=>{
    const req = await fetch(_URL+`api/message/status/${message}/${status}`)
    return req.json()
}

export const getRequst=async(message:string,user:string)=>{
    const req = await fetch(_URL+`api/message/get-resend/${message}/${user}`)
    return req.json()
}