import { app, DB } from "../App";
import {searchChannelLike, searchLikePost, searchQuery} from '../querys/queryAuth'
const SearchComponent=()=>{
    app.get('/api/search/:like',async(req,res)=>{
        const reqUser=await DB.query(searchQuery(req.params.like))
        const reqPost = await DB.query(searchLikePost(req.params.like))
        const reqChannel =await DB.query(searchChannelLike(req.params.like))
        res.send({
            user:reqUser?.result,
            post:reqPost?.result,
            channel:reqChannel?.result
        })
    })
}

export default SearchComponent