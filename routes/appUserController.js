const router = require('koa-router')()
const query = require('./MYSQL');
router.prefix('/appUserController');
// // 获取用户列表信息和查询用户信息
router.post('/',async (ctx,next)=>{
    // let userId = ctx.request.body.userId;
    // let a = await query(`SELECT * FROM users WHERE userId = ${userId}`)
    // let result = JSON.parse(JSON.stringify(a));
    // let total = await query(`SELECT COUNT(*) FROM users`)
    // console.log(length,"lengthlengthlength")
    // console.log(ctx.request.body)
    const query_data = ctx.request.body.query_data;
    const page_num = ctx.request.body.page_num; //当前的num
	const page_size = ctx.request.body.page_size; //当前页的数量
    let a = await query(`select count(*) as total from users`)
    let result = JSON.parse(JSON.stringify(a))
    // console.log(page_num,page_size)
    var data = {}
	if (page_num == 1) {
        if(query_data ==''){
            // 没有指定搜索内容的时候
            let a1 = await query(`select * from users limit 0,${page_size}`)
            let result1 = JSON.parse(JSON.stringify(a1))
            // console.log(result1,"resultresultresult123123123")
            data = {
                code:200,
                paging:{
                    page_num: page_num,
                    page_size: page_size,
                    total: result[0].total
                },
                data:result1
            }
        }else{
            // 指定了搜索内容
            console.log('这里是特殊的特殊的')
            console.log(query_data)
            let a1 = await query(`select * from users where username = '${query_data}' limit 0,${page_size}`)
            let result1 = JSON.parse(JSON.stringify(a1))
            // console.log(result1,"resultresultresult123123123")
            let a2 = await query(`select count(*) as total from users where username = '${query_data}'`)
            let result2 = JSON.parse(JSON.stringify(a2))
            data = {
                code:200,
                paging:{
                    page_num: page_num,
                    page_size: page_size,
                    total: result2[0].total
                },
                data:result1
            }
        }
	} else {
        // 页码不是第一页
        if(query_data ==''){
            // 没有指定搜索内容
            // 列表模块   limit 参数 n,m  n表示开始的那条数据，从0开始
		let sql = "select * from users limit ?,?"
		// 分页的原理：当前页码-1乘以显示的总数等于n，m等于显示的条数
		let parmas = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
        console.log(parmas,"parmasparmas")
        let a1 = await query(sql,parmas)
        let result1 = JSON.parse(JSON.stringify(a1))
		// console.log(result1,"resultresultresult6666666666666666666")
        data = {
            code:200,
            paging:{
                page_num: page_num,
                page_size: page_size,
                total: result[0].total
            },
            data:result1
        }
        }else{
            // 有搜索内容并且不是第一页
                // 列表模块   limit 参数 n,m  n表示开始的那条数据，从0开始
                // `select * from users where username = '${query_data}' limit 0,${page_size}`
		// 分页的原理：当前页码-1乘以显示的总数等于n，m等于显示的条数
        let parmasA = (parseInt(page_num) - 1) * parseInt(page_size)
        let parmasB = parseInt(page_size)
        let a1 = await query(`select * from users where username = '${query_data}' limit ${parmasA},${parmasB}`)
        let result1 = JSON.parse(JSON.stringify(a1))
		let a2 = await query(`select count(*) as total from users where username = '${query_data}'`)
        let result2 = JSON.parse(JSON.stringify(a2))

        data = {
            code:200,
            paging:{
                page_num: page_num,
                page_size: page_size,
                total: result2[0].total
            },
            data:result1
        }
        }
	}
    ctx.body = data;
})
router.post('/add',async (ctx,next)=>{
    console.log(ctx.request.body)
    let {username, password, email, tel, address, userId} = ctx.request.body;
    console.log(username,password, email, tel, address, userId)
    // `insert into orderRecord(userId,docId,orderTime,detailTime) value('${userId}','${docId}','${orderTime}','${detailTime}') `
    await query(`insert into users(username, password, email, tel, address) value('${username}', '${password}', '${email}', '${tel}', '${address}')`)
   data = {
    code:200
   }
   ctx.body = data
})

router.post('/edit',async (ctx,next)=>{
    console.log(ctx.request.body)
    let {username, password, email, tel, address, userId} = ctx.request.body;
    console.log(username,password, email, tel, address, userId)
    await query(`update users set username = '${username}', password = '${password}', email = '${email}', tel = '${tel}', address = '${address}' where userId = '${userId}'`)
   data = {
    code:200
   }
   ctx.body = data
})

router.post('/delete',async (ctx,next)=>{
    console.log(ctx.request.body)
    let userId = ctx.request.body.userId
    await query(`delete from users where userId = ${userId}`)
   data = {
    code:200
   }
   ctx.body = data
})

module.exports = router