import config from "../config/uriconfig"
const apiFront=config.apiAddressFront+'/cart/';
addCart=(productId,count)=>{
   return fetch(apiFront+'addCart.do?productId='+productId+"&count"+count,{
    method: "POST",
    mode : 'cors',//跨域限制，后台已经处理，rn本身没有跨域限制
    credentials: 'include',//允许存取cookie信息
   }) 
}
update=(productId,count)=>{
   return fetch(apiFront+'update.do?'+'count='+count+'&productId='+productId,{
    method: "POST",
    mode : 'cors',//跨域限制，后台已经处理，rn本身没有跨域限制
    credentials: 'include',//允许存取cookie信息
    // body:parameters//接口bug，偶尔会无法通过body传输
   }) 
}
deleteProduct=(productIds)=>{
    let parameters=new FormData();
    parameters.append("productIds",productIds);
    return fetch(apiFront+"deleteProduct.do",{
        method:'POST',
        mode:"cors",
        credentials:'include',
        body:parameters
    })
}
getCartList=()=>{
    return fetch(apiFront+"list.do",{
        method:'POST',
        mode:"cors",
        credentials:'include'
    })
}
selectAll=()=>{
    return fetch(apiFront+"select_all.do",{
        method:'POST',
        mode:"cors",
        credentials:'include'
    })
}
unSelectAll=()=>{
    return fetch(apiFront+"un_select_all.do",{
        method:'POST',
        mode:"cors",
        credentials:'include'
    })
}
select=(productId)=>{
    return fetch(apiFront+"select.do?productId="+productId,{
        method:'POST',
        mode:"cors",
        credentials:'include'
    })
}
unSelect=(productId)=>{
    return fetch(apiFront+"un_select.do?productId="+productId,{
        method:'POST',
        mode:"cors",
        credentials:'include'
    })
}
module.exports={
    addCart,
    update,
    unSelectAll,
    selectAll,
    getCartList,
    deleteProduct, 
    select,
    unSelect
}
