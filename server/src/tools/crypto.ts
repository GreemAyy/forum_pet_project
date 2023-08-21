import {createHmac} from 'crypto'

export const encrypt=(password:string)=>{
    const secret = 'qwerty'
    const hash= createHmac("sha256",secret)
                .update(password)
                .digest('hex')
    return hash
}

export const hashGen = ()=>{
    const datas= 'qwertyuiopasdfghjklzxcvbnm1234567890'
    let total:string = ''
    for(let i = 0; i<20;i++){
        total+=datas[Math.floor(Math.random()*(datas.length-1))]
    }
    return total
}