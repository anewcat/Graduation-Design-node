const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/docCenter');

// 返回侧边栏
router.post('/', async (ctx, next) => {
	let routerList = [
		{
		  id: "1",
		  authName: "我的请假",
		  path: "/docCenter/myWorkTime",
		},
		{
		  id: "2",
		  authName: "排班与打卡",
		  path: "/docCenter/qjAnddk",
		},
		{
		  id: "3",
		  authName: "个人信息",
		  path: "/docCenter/docInform",
		},
	  ];
	  var data = {
		code: 200,
		routerList,
	  };
	  ctx.body = data;
})
// 查询医生用户的工作时间
router.post('/myWorkTime', async (ctx, next) => {
	let userId = ctx.request.body.userId;
	let a = await query(`SELECT * FROM zhibanMsg where userId = '${userId}'`);
    var result = JSON.parse(JSON.stringify(a))
	if(result.length>0){
		data = {
			code:200,
			result
		}
	}else{
		data = {
			code:0
		}
	}
	ctx.body = data;

	
})
module.exports = router