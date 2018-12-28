//此部分代码仅供node运行,请勿在React中引入
//获取局域网IP地址，切换网络后请重新获取IP地址，到uriconfig中修改当前最新的地址，否者可能琺使用API和图片服务
var os=require('os'),
  iptable={},
  ifaces=os.networkInterfaces();
for (var dev in ifaces) {
  ifaces[dev].forEach(function(details,alias){
    if (details.family=='IPv4') {
      iptable[dev+(alias?':'+alias:'')]=details.address;
    }
  });
}
//本地开发环境使用本地WLANip，127.0.0.1无法在此使用
console.log(iptable)