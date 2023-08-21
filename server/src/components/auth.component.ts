import { app, DB } from "../App";
import { Request ,Response} from "express";
import {createUserAuthQuery,
        checkUserAuthQuery,
        selectUserAuthQuery,
        setHashAuthQuery} 
        from '../querys/queryAuth'
import { encrypt ,hashGen} from "../tools/crypto";

function AuthComponent() {
    app.post("/api/auth/reg", (req, res) => {
        checkUser(req.body.username)
        .then(data=>{
            //@ts-ignore
            if(data?.result?.length==0)reg(req,res)
            else res.send({status:401})
            })
    });
    app.post('/api/auth/log',(req,res)=>{
        checkUser(req.body.username)
        .then(data=>{
            //@ts-ignore
            if(data?.result?.length>0)log(req,res)
            else res.send({status:400})
        })
    })
  
}

const log=(req:Request,res:Response)=>{
    const data:{username:string,password:string} = {
        username: req.body.username,
        password: encrypt(req.body.password),
    }
    selectUser(data)
    .then(data=>res.send(data))
}
const selectUser=async(data:{username:string,password:string})=>{
    const hash:string =hashGen()
    const getUser = await DB.query(selectUserAuthQuery(data.username,data.password))
    //@ts-ignore
    const setHash = await DB.query(setHashAuthQuery(hash,getUser.result[0].ID))
    //@ts-ignore
    return {hash,id:getUser.result[0].ID,status:200}
    
}
//компонент регестрации
const reg=(req:Request,res:Response)=>{
    const data = {
        name: req.body.name,
        username: req.body.username,
        password: encrypt(req.body.password),
      };
    const query=createUserAuthQuery(data)
    // @ts-ignore
    DB.query(query).then(data=>res.send({status:data?.error?400:200}))
}
//компонент проверки пользователя 
const checkUser=async(username:string)=>{
    const query= await DB.query(checkUserAuthQuery(username))
    return query
}

export default AuthComponent;
