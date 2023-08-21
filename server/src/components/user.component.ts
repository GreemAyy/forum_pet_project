import { app, DB } from "../App";
import { getUserQuery } from "../querys/queryAuth";

function UserComponent(){
    app.get('/api/user/get-master/:id/:hash',(req,res)=>{
        DB.query(getUserQuery(req.params.id,req.params.hash))
        .then(data=>{
            //@ts-ignore
            const result = data?.result.length>0?data?.result?.[0]:{status:400}
            //@ts-ignore
            if(data?.result.length>0)
                result.status=200
            res.send(result)
        })
    })
    app.get('/api/get-user/:id',async(req,res)=>{
        const call = (await DB.query('SELECT  `name`, `username`, `profile_img` FROM `users` WHERE `ID`='+req.params.id))
        const data = await call?.result[0]
        res.send(data)
    })
}

export default UserComponent