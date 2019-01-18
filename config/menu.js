const UserMenuInfos = {
    mainTitle: "帐号设置",
    subInfos: [{
            title: '我的帐号信息',
            path: 'UserInfos'
        },
        {
            title: '密保设置',
            path: ''
        },
        {
            title: '修改密码',
            path: 'UpdatePwd'
        },
        {
            title: '我的收货地址',
            path: 'address'
        }
    ]
}
const AppInfoMenu = {
    mainTitle: '关于',
    subInfos: [{
        title: '关于MallAPP',
        path: '',
        alertTitle:"MallApp",
        alertSubTitle:[
            "1.基于React-Native开发",
            "2.仅用于学习参考,布局方面参考手淘页面",
            "3.github地址：https://github.com/jeryqwq/MallApp",
            "4.fork后代码支付功能请参照支付宝官方文档注册并获取密钥测试https://openhome.alipay.com/platform/appDaily.htm"
        ]
    }, {
        title: '版本信息',
        path: '',
    }]
}
module.exports = {
    AppInfoMenu,
    UserMenuInfos
}