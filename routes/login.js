const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/login');

router.get('/', function(ctx, next) {
	ctx.body = '这是登录页面'
});
// 用户登录
router.post('/users', async (ctx, next) => {
	console.log(ctx.request.body);
	let name = ctx.request.body.userName;
	let pass = ctx.request.body.password;
	// console.log(name,pass,"6666666666666666666666666")
	//根据用户名和密码查询数据库
	let a = await query(`SELECT * FROM users where username = '${name}' and password = '${pass}'`);
	// console.log(a,"woshiaaaaaaaaaaaaa");
	// console.log(a.length);
	// 格式化数据类型
	var dataString = JSON.stringify(a);
    var result = JSON.parse(dataString)
	// console.log(result,"7777777777777777777777777777777")
	var data = ''
	if(result.length>0){
		data = {
			code:200,
			data:result
		}
	}else{
		data = {
			code:0
		}
	}
	ctx.body = data;
})
// 医生登录
router.post('/doc', async (ctx, next) => {
	console.log(ctx.request.body);
	let name = ctx.request.body.userName;
	let pass = ctx.request.body.password;
	// console.log(name,pass,"6666666666666666666666666")
	//根据用户名和密码查询数据库
	let a = await query(`SELECT * FROM docInform where docName = '${name}' and docPass = '${pass}'`);
	// console.log(a,"woshiaaaaaaaaaaaaa");
	// console.log(a.length);
	// 格式化数据类型
	var dataString = JSON.stringify(a);
    var result = JSON.parse(dataString)
	// console.log(result,"7777777777777777777777777777777")
	var data = ''
	if(result.length>0){
		data = {
			code:200,
			data:result
		}
	}else{
		data = {
			code:0
		}
	}
	ctx.body = data;
})
module.exports = router