import { _URL } from "@/tools/URL"

export const searchQuery=async(like:string)=>{
    const req = await fetch(_URL+'api/search/'+like)
    const data = await req.json()
    return data
}

export const mediaForm=(media:any)=>{
    const formdata = new FormData()
           //@ts-ignore
    for(let i = 0;i<media.length;i++){
       formdata.append('file',media[i])
    }
    return formdata
}