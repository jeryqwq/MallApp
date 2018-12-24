import config from "../config/uriconfig"
const apiFront=config.apiAddressFront+'/manage/category/';
getChildrenCategory=(parentId)=>{
    return fetch(apiFront+'getChildrenCategory.do?parentId='+parentId,{
     method: "POST",
     mode : 'cors',//跨域限制，后台已经处理，rn本身没有跨域限制
     credentials: 'include',//允许存取cookie信息
    }) 
 }
 getDeepCategory=(categoryId)=>{
    return fetch(apiFront+'getDeepCategory.do?categoryId='+categoryId,{
     method: "POST",
     mode : 'cors',//跨域限制，后台已经处理，rn本身没有跨域限制
     credentials: 'include',//允许存取cookie信息
    }) 
 }
 module.exports={
    getChildrenCategory,
    getDeepCategory
    
 }