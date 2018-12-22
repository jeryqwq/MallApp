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
        path: ''
    }, {
        title: '版本信息',
        path: ''
    }]
}
module.exports = {
    AppInfoMenu,
    UserMenuInfos
}