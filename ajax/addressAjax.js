import config from "../config/uriconfig"

const apiFront=config.apiAddressFront+'/shipping/';

addAddress=(receiverName,receiverPhone,receiverZip,receiverProvince,receiverAddress,receiverCity)=>{
   return fetch(apiFront+'add.do?'+"receiverName="+receiverName+"&receiverPhone="+receiverPhone+
   "&receiverZip="+receiverZip+"&receiverProvince="+receiverProvince+"&receiverAddress="+receiverAddress+
   "&receiverCity="+receiverCity,
{
    method: "POST",
    mode : 'cors',//跨域限制，后台已经处理，rn本身没有跨域限制
    credentials: 'include',//允许存取cookie信息
   })
}

delAddress=(shippingId)=>{
return fetch(apiFront+'del.do?shippingId='+shippingId,{
    method: "POST",
    mode : 'cors',
    credentials: 'include',
})
}
update=(id,receiverName,receiverPhone,receiverZip,receiverProvince,receiverAddress,receiverDistrict)=>{
    return fetch(apiFront+'update.do?id='+id+"&receiverName="+receiverName+"&receiverPhone="+receiverPhone+
    "&receiverZip="+receiverZip+"&receiverProvince="+receiverProvince+"&receiverAddress="+receiverAddress+
    "&receiverCity="+receiverDistrict,{
     method: "POST",
     mode : 'cors',
     credentials: 'include',
    })
}
list=(pageNum,pageSize)=>{
    return fetch(apiFront+'list.do?pageNum='+pageNum+"&pageSize="+pageSize,{
        method: "POST",
        mode : 'cors',
        credentials: 'include',
    })
}
select=(addressId)=>{
    return fetch(apiFront+'/select.do?shippingId='+addressId,{
        method: "POST",
        mode : 'cors',
        credentials: 'include',
    })
}
getDefaultAddress=()=>{
    return fetch(apiFront+'/defaultAddress.do',{
        method: "POST",
        mode : 'cors',
        credentials: 'include'
    })
}
module.exports={
    list,
    update,
    delAddress,
    addAddress,
    select,
    getDefaultAddress
}