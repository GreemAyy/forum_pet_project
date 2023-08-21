import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'

class HTTPConnection{
    public app:express.Application = express()
    public WS:any
    constructor(public port:number){}
    connect(){
        this.app.use(cors())
        this.app.use(bodyParser.urlencoded({extended:false}))
        this.app.use(bodyParser.json())
        this.app.use(fileUpload())
        this.app.listen(this.port)
    }
}

export default HTTPConnection
