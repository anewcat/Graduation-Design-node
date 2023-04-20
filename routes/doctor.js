const router = require('koa-router')()
const query = require('./MYSQL');
router.prefix('/doctor');

router.post('/', async (ctx,next) => {
    let routerList = [
        // {id:'128',authName:"首 页",path:'childrenIndex'},
        {id:'125',authName:"用户管理",children:[{id:1,path:'/admin/appUser',authName:"APP客户"},{id:2,path:'/admin/doctorUser',authName:"医生用户"}]},
        {id:'145',authName:"医院简介和公告管理",children:[{id:3,path:'/admin/hospitalMsg',authName:"医院简介"},{id:4,path:'/admin/hospitalMsg2',authName:"公告信息"}]},
        {id:'200',authName:"预约和挂号管理",children:[{id:10,path:'/admin/yuYue',authName:"预约列表信息"},{id:11,path:'/admin/guaHao',authName:"挂号列表信息"}]},
        {id:'103',authName:"医院人员信息管理",children:[{id:5,path:'/admin/doctorList',authName:"医生的信息"},]},
        // {id:6,path:'nurseList',authName:"护士的信息"},
        
        
        {id:'101',authName:"值班信息管理",children:[{id:7,path:'doctorRelaxed',authName:"医生值班安排"},]},
        // {id:8,path:'nurseRelaxed',authName:"护士值班安排"},
        
        // {id:'102',authName:"手术安排管理",children:[{id:9,path:'operation',authName:"手术安排"}]},
        {id:'206',authName:"常见病治疗方法",children:[{id:16,path:'yi_liao',authName:"常见病治疗方法"}]},
        {id:'201',authName:"宠物档案中心",children:[{id:12,path:'dangAn',authName:"宠物档案"}]},
        {id:'202',authName:"请假管理",children:[{id:13,path:'qingJia',authName:"请假列表"}]},
        {id:'203',authName:"打卡记录",children:[{id:14,path:'daKa',authName:"打卡记录列表"}]},
        // {id:'204',authName:"宠物商品管理",children:[{id:15,path:'petGoods',authName:"商品列表"}]},
        {id:'205',authName:"系统中心设置",children:[{id:16,path:'systemCenter',authName:"修改密码"},{id:17,path:'systemCenter2',authName:"添加管理员"},{id:18,path:'systemCenterManage',authName:"管理员列表"}]},
        
    ]
    var data = {
        code:200,
        routerList
    }
    ctx.body = data
})
module.exports = router