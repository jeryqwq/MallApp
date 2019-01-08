import config from "./../config/uriconfig"
//接口大类拼接
const apiFront=config.apiAddressFront+"/product/";
// Set<String> PRICE_ASC_DESC=Sets.newHashSet("price_desc","price_asc");
// Set<String> STOCK_ASC_DESC=Sets.newHashSet("stock_desc","stock_asc");
productList=(keyword,categoryId,pageNum,pageSize,orderBy)=>{
    let parameterForm=new FormData();
if(keyword!=''){
    parameterForm.append("keyword",keyword);
}
if(categoryId!=''){
    parameterForm.append('categoryId',categoryId)
}
if(pageNum!=''){
    parameterForm.append('pageNum',pageNum)
}
if(pageSize!=''){
    parameterForm.append('pageSize',pageSize)
}
if(orderBy!=''){
    parameterForm.append("orderBy",orderBy);
}
return fetch(apiFront+"/list.do", {
    method: "POST",
    mode : 'cors',//跨域限制，后台已经处理，rn本身没有跨域限制
    credentials: 'include',//允许存取cookie信息
    body:parameterForm
  })
}
getDetail=(productId)=>{
    return fetch(apiFront+"/detail.do?productId="+productId, {
        method: "POST",
        mode : 'cors',//跨域限制，后台已经处理，rn本身没有跨域限制
        credentials: 'include',//允许存取cookie信息
      })
}
insertComment=(productId,cContent,cStarts)=>{
let paramsFrom=new FormData();
paramsFrom.append("productId",productId);
paramsFrom.append("cContent",cContent);
paramsFrom.append("cStarts",cStarts);
return fetch(apiFront+"/comment.do", {
    method: "POST",
    mode : 'cors',//跨域限制，后台已经处理，rn本身没有跨域限制
    credentials: 'include',//允许存取cookie信息
    body:paramsFrom
  })
}
getComment=(productId)=>{
    return fetch(apiFront+'/getComment.do?productId='+productId,{
        method: "POST",
        mode : 'cors',//跨域限制，后台已经处理，rn本身没有跨域限制
        credentials: 'include',//允许存取cookie信息
    })
}
comment=(cContent,cStarts,productId,toId,orderNo)=>{
    return fetch(apiFront+'/comment.do?cContent='+cContent+"&cStarts="+cStarts+"&productId="+productId+"&toId="+toId+"&orderNo="+orderNo,{
        method: "POST",
        mode : 'cors',//跨域限制，后台已经处理，rn本身没有跨域限制
        credentials: 'include',//允许存取cookie信息
    })
}
module.exports={
    insertComment,
    getDetail,
    productList,
    getComment,
    comment
}
