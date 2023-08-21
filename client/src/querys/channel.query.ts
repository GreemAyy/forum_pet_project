import { _URL } from "@/tools/URL"
import { mediaForm } from "./any.query"

export const getChannel=async(channel:string,id:string)=>{
    const req = await fetch(_URL+'api/channel/'+channel+'/'+id)
    return (req.json())
}

export const subChannel=async(id:string,channel:string)=>{
    const req = await fetch(_URL+'api/sub/'+channel+'/'+id)
    return (req.json())
}

export const createPost=
async({channelChild,creatorID,title,body,media}:
    {channelChild:string|undefined,
    creatorID:string|undefined,
    title:string,
    body:string,
    media:any}
)=>{
        const formdata = mediaForm(media)
        formdata.append('data',JSON.stringify({
            channel:channelChild,
            id:creatorID,
            title,
            text:body
        }))
        const req= await fetch(_URL+'api/create-post',{
            method:'post',
            body:formdata
        })
        const result = await req.json()
        return result
}

export const createMessage=async(
    
)=>{

}