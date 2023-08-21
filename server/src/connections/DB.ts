import mysql from 'mysql2'

interface IDBParams{
    host:string
    user:string
    password:string
    database:string
}

class DBConnection{
    public connection!:mysql.Connection
    constructor(private config:IDBParams){}
    connect(){
        this.connection=mysql.createConnection(this.config)
    }
    query(query:string):Promise<{error:mysql.QueryError}|{result:any[]}>{
       return new Promise((resP,rejP)=>{
        this.connection.query(query,(err,result)=>{
            let data:{error:mysql.QueryError}|{result:any}|{result:any[]} = err?{error:err}:{result}
            //@ts-ignore
            resP(data)
        })
       })
    }
}

export default DBConnection