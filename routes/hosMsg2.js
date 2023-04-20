const router = require('koa-router')()
const query = require('./MYSQL');
router.prefix('/hosMsg2');
// // 获取用户列表信息和查询用户信息
router.post('/',async (ctx,next)=>{

    const query_data = ctx.request.body.query_data;
    const page_num = ctx.request.body.page_num; //当前的num
	const page_size = ctx.request.body.page_size; //当前页的数量
    let a = await query(`select count(*) as total from usuall_fill`)
    let result = JSON.parse(JSON.stringify(a))
    // console.log(page_num,page_size)
    var data = {}
	if (page_num == 1) {
            let a1 = await query(`select * from usuall_fill limit 0,${page_size}`)
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
        
	} else {
        // 页码不是第一页
            // 没有指定搜索内容
            // 列表模块   limit 参数 n,m  n表示开始的那条数据，从0开始
		let sql = "select * from usuall_fill limit ?,?"
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
        
	}
    ctx.body = data;
})
router.post('/add',async (ctx,next)=>{
    console.log(ctx.request.body)
    let {title_ming, reason, sysbol, fangfa} = ctx.request.body;
    console.log(title_ming, reason, sysbol, fangfa)
    // `insert into orderRecord(userId,docId,orderTime,detailTime) value('${userId}','${docId}','${orderTime}','${detailTime}') `
    await query(`insert into usuall_fill(title_ming, reason, sysbol, fangfa) value('${title_ming}', '${reason}', '${sysbol}', '${fangfa}')`)
   data = {
    code:200
   }
   ctx.body = data
})

router.post('/edit',async (ctx,next)=>{
    console.log(ctx.request.body)
    let {title_ming, reason, sysbol, fangfa,id} = ctx.request.body;
    // console.log(title_ming, reason, sysbol, fangfa)
    await query(`update usuall_fill set title_ming = '${title_ming}', reason = '${reason}', sysbol = '${sysbol}', fangfa = '${fangfa}' where id = '${id}'`)
   data = {
    code:200
   }
   ctx.body = data
})

router.post('/delete',async (ctx,next)=>{
    console.log(ctx.request.body)
    let id = ctx.request.body.id
    await query(`delete from usuall_fill where id = ${id}`)
   data = {
    code:200
   }
   ctx.body = data
})

module.exports = router