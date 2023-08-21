import { DB, app } from "../App"

export const MediaComponent=()=>{
    app.get('/api/media/:id',async(req,res)=>{
        const DBreq= await DB.query('SELECT * FROM `media` WHERE ID='+req.params.id)
        res.sendFile('I:/a/server/media/'+(
            //@ts-ignore
            DBreq?.result.length>0?
            //@ts-ignore
            DBreq?.result[0].name:
            '404.png'
        ))
    })

    app.post('/api/get-media-data',(req,res)=>{
        
    })
}

export default MediaComponent