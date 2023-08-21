import {_URL} from '../tools/URL'

export const regUser=
async (data
:{name:string,username:string,password:string},
type:string)=>{
    const req = await fetch(_URL+'api/auth/'+(type=='reg'?'reg':'log'),{
                method:"POST",
                //@ts-ignore
                headers:{'Content-type':'application/json'},
                body:JSON.stringify(data)})
    const result= await req.json()
    return result
}

