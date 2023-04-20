const router = require("koa-router")();
const { Layer } = require("koa-router");
const query = require("./MYSQL");
router.prefix("/admin");

router.get("/", async (ctx, next) => {
//   let routerList = [
//   {id:'128',authName:"首 页",path:'childrenIndex'},
//   {id:'125',authName:"用户管理",children:[{id:1,path:'/admin/appUser',authName:"APP客户"},{id:2,path:'/admin/doctorUser',authName:"医生用户"}]},
//   {id:'145',authName:"医院简介和治疗方案",children:[{id:3,path:'/admin/hospitalMsg',authName:"医院简介"},{id:4,path:'/admin/hospitalMsg2',authName:"常见病治疗方案"}]},
//   {id:'200',authName:"预约和挂号管理",children:[{id:10,path:'/admin/yuYue',authName:"预约列表信息"},{id:11,path:'/admin/guaHao',authName:"挂号列表信息"}]},
//   // {id:6,path:'nurseList',authName:"护士的信息"},

//   {id:'101',authName:"值班信息管理",children:[{id:7,path:'/admin/doctorRelaxed',authName:"医生值班安排"},]},
//   {id:'201',authName:"宠物档案中心",children:[{id:12,path:'/admin/dangAn',authName:"宠物档案"}]},
//   {id:'202',authName:"请假管理",children:[{id:13,path:'/admin/qingJia',authName:"请假列表"}]},
//   {id:'203',authName:"打卡记录",children:[{id:14,path:'/admin/daKa',authName:"打卡记录列表"}]},
//   {id:'205',authName:"系统中心设置",children:[{id:16,path:'/admin/systemCenter',authName:"修改密码"},{id:17,path:'/admin/systemCenter2',authName:"添加管理员"},{id:18,path:'/admin/systemCenterManage',authName:"管理员列表"}]},
//   ]
  let mydata = JSON.parse(
    JSON.stringify([
        {
            path: "/admin",
            component: "Layout",
            meta: {
              title: "角色管理",
              hidden: false,
              keepAlive: true,
              roles: ["ADMIN"]
            },
            children: [
              {
                path: "appUser",
                component: "Admin/appUser",
                name: "appUSer",
                meta: {
                  title: "APP用户管理",
                  hidden: false,
                  keepAlive: true,
                  roles: ["ADMIN"]
                },
              },
              {
                path: "doctorUser",
                component: "Admin/doctorUser",
                name: "doctorUser",
                meta: {
                  title: "员工管理",
                  hidden: false,
                  keepAlive: true,
                  roles: ["ADMIN"]
                },
              },
            ],
          },
      {
        path: "/hosDetail",
        component: "Layout",
        meta: {
          title: "医院简介和治疗方案",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
        children: [
          {
            path: "hospitalMsg",
            component: "hosDetail/hospitalMsg",
            name: "hospitalMsg",
            meta: {
              title: "医院简介",
              hidden: false,
              roles: ["ADMIN"],
              keepAlive: true,
            },
          },
          {
            path: "hospitalMsg2",
            component: "hosDetail/hospitalMsg2",
            name: "hospitalMsg2",
            meta: {
              title: "常见病治疗方案",
              hidden: false,
              roles: ["ADMIN"],
              keepAlive: true,
            },
          },
        ],
      },
      {
        path: "/Order",
        component: "Layout",
        meta: {
          title: "预约管理",
          icon: "link",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
        children: [
          {
            path: "index",
            name: "Order",
            component: "Order/index",
            meta: {
              title: "预约列表信息",
              hidden: false,
              roles: ["ADMIN"],
              keepAlive: true,
            },
          },
        ],
      },
      {
        path: "/workTime",
        component: "Layout",
        meta: {
          title: "值班信息管理",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
        children: [
            {
                path: "index",
                component: "workTime/index",
                meta: {
                title: "医生值班安排",
                hidden: false,
                roles: ["ADMIN"],
                keepAlive: true,
                },
            },
        ]
    },
    {
        path: "/qingJia",
        component: "Layout",
        meta: {
          title: "请假和打卡管理",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
        children: [
          {
            path: "daka",
            component: "qingJia/daka",
            name: "daka",
            meta: {
              title: "打卡记录",
              hidden: false,
              roles: ["ADMIN"],
              keepAlive: true,
            },
          },
          {
            path: "qingjia",
            component: "qingJia/qingjia",
            name: "qingjia",
            meta: {
              title: "请假列表",
              hidden: false,
              roles: ["ADMIN"],
              keepAlive: true,
            },
          }
        ]
      },
      {
        path: "/PetInform",
        component: "Layout",
        meta: {
          title: "宠物档案中心",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
        children: [
          {
            path: "index",
            component: "PetInform/index",
            meta: {
              title: "宠物档案",
              hidden: false,
              roles: ["ADMIN"],
              keepAlive: true,
            },
      },

    ]
      },
      {
        path: "/system",
        component: "Layout",
        meta: {
          title: "系统中心设置",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
        children: [
      {
        path: "editInform",
        component: "system/editInform",
        meta: {
          title: "个人信息及修改密码",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
  }

    ]
      }
    ]))
//   console.log(mydata, "mydatamydata");
  var data = {
    code: "00000",
    data: mydata,
    // routerList
  };
  ctx.body = data;
});
module.exports = router;
