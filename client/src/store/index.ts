import { createStore } from 'vuex'
import {getCookiesAll} from '../tools/cookie'
const cookies = getCookiesAll()

export default createStore({
  state: {
    openModal:false,
    openOuter:false,
    id:cookies?.id?cookies?.id:null,
    hash:cookies?.hash?cookies?.hash:null,
    userData:null,
    newPost:null,
    isExsist:false,
    path:((window.location.pathname).split('/'))[((window.location.pathname).split('/').length)-1],
    showBottom:false,
    bottomData:'',
    bottomStatus:'def',
    newMessage:null,
    reqID:0,
    subUpdate:false
  },
  mutations: {
    setSubUpdate(state,data){
      state.subUpdate=data
    },
    setReqID(state,id){
      state.reqID=id
    }
    ,
    modalEvents(state,toDo){
      state.openModal=toDo
    },
    setUserData(state,value){
      state.userData=value
    },
    outerEvents(state,toDo){
      state.openOuter=toDo
    },
    addNewPost(state,id){
      state.newPost=id
    },
    changeExsist(state,data){
      state.isExsist=data
    },
    bottomEvent(state,payload:{open:boolean,data:string|number,status:string}){
      state.showBottom=payload.open
      state.bottomData=String(payload.data)
      state.bottomStatus=payload.status
    },
    addNewMessage(state,id){
      state.newMessage=id
    }
  }
})
