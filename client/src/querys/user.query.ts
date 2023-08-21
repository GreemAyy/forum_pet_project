import { _URL } from "@/tools/URL"
import { useStore } from "vuex"


export const getMaster = async()=>{
    const store= useStore()
    const id = store.state.id
    const hash = store.state.hash
    const req = 
    await fetch(_URL+`api/user/get-master/${id}/${hash}`)
    const result = await req.json()
    return result
}

export const getUser=async(id:string)=>{
    const req = await fetch(_URL+'api/get-user/'+id)
    return await req.json()
}