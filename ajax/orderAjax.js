import config from "../config/uriconfig"
const apiFront=config.apiAddressFront+'/order/';
const manageApiFront=config.apiAddressFront+'/manage/order/';
cancel=(orderNo)=>{
    let paramform=new FormData();
    paramform.append("orderNo",orderNo);
    return fetch(apiFront+'cancel.do',{
        method:'POST',
        mode:"cros",
        credentials:'include',
        body:paramform
    })
}
create=(shippingId)=>{
    let params=new FormData();
    params.append("shippingId",shippingId);
    return fetch(apiFront+"create.do",{
        method:'POST',
        mode:"cors",
        credentials:'include',
        body:params
    })
}
pay=(orderNo)=>{
    let params=new FormData();
    params.append("orderNo",orderNo);
    return fetch(apiFront+"pay.do",{
        method:'POST',
        mode:"cors",
        credentials:'include',
        body:params
    })
}

queryPayStatus=(orderNo)=>{
    let params=new FormData();
    params.append("orderNo",orderNo);
    return fetch(apiFront+"queryPayStatus.do",{
        method:'POST',
        mode:"cors",
        credentials:'include',
        body:params
    })
}
getOrderCartProduct=()=>{
    return fetch(apiFront+"get_order_cart_product.do",{
        method:'POST',
        mode:"cors",
        credentials:'include',
    })
}
orderDetail=(orderNo)=>{
    let params=new FormData();
    params.append("orderNo",orderNo);
    return fetch(apiFront+"orderDetail.do",{
        method:'POST',
        mode:"cors",
        credentials:'include',
    })
}
list=(pageNum,pageSize)=>{
let params =new FormData();
params.append("pageNum",pageNum);
params.append("pageSize",pageSize);
return fetch(apiFront+"list.do",{
    method:'POST',
    mode:"cors",
    credentials:'include',
    body:params
})
}
//用户签收
setShipped=(orderNo)=>{
    return fetch(manageApiFront+'setShipped.do?orderNo='+orderNo,{
        method:'POST',
        mode:"cors",
        credentials:'include'
    })
}
module.exports={
    list,
    orderDetail,
    getOrderCartProduct,
    queryPayStatus,
    pay,
    create,
    cancel,
    setShipped
}