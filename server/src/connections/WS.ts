import express from 'express'
import expressWS from 'express-ws'

class WSConnection {
    public WS:expressWS.Instance
    public aWSS
    constructor(app:express.Application){
        this.WS=require('express-ws')(app)     
        this.aWSS=this.WS.getWss()
    }
}

export default WSConnection