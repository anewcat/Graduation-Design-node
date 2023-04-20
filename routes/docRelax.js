const router = require('koa-router')()
const query = require('./MYSQL');
router.prefix('/docRelax');

router.post('/', async (ctx,next) => {
    const query_data = ctx.request.body.query_data;
    const page_num = ctx.request.body.page_num; //当前的num
	const page_size = ctx.request.body.page_size; //当前页的数量
    let a = await query(`select count(*) as total from zhibanMsg`)
    let result = JSON.parse(JSON.stringify(a))
    // console.log(page_num,page_size)
    var data = {}
	if (page_num == 1) {
            // 没有指定搜索内容的时候
            let a1 = await query(`select * from zhibanMsg limit 0,${page_size}`)
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
		let sql = "select * from zhibanMsg limit ?,?"
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

router.post('/add', async (ctx,next) => {
    console.log("this is docRelax add")
    let {mondayStatus,
    tuesdayStatus,
    wednesdayStatus,
    thursdayStatus,
    fridayStatus,
    saturdayStatus,
    sundayStatus,
    username} = ctx.request.body
    // let id = 1
    // console.log(hosname,tel,address,introduce)
    console.log(mondayStatus,
        tuesdayStatus,
        wednesdayStatus,
        thursdayStatus,
        fridayStatus,
        saturdayStatus,
        sundayStatus,
        username)
    await query(`insert into zhibanMsg(mondayStatus, tuesdayStatus, wednesdayStatus, thursdayStatus, fridayStatus, saturdayStatus, sundayStatus, username) value('${mondayStatus}','${tuesdayStatus}','${wednesdayStatus}','${thursdayStatus}','${fridayStatus}','${saturdayStatus}','${sundayStatus}','${username}')`)
    var data = {
        code:200,
    }
    ctx.body = data
})

router.post('/edit', async (ctx,next) => {
    let {mondayStatus,
    tuesdayStatus,
    wednesdayStatus,
    thursdayStatus,
    fridayStatus,
    saturdayStatus,
    sundayStatus,
    username,
    id} = ctx.request.body
    // let id = 1
    // console.log(hosname,tel,address,introduce)
    console.log(id,"ididididid")
    await query(`update zhibanMsg set mondayStatus = '${mondayStatus}',tuesdayStatus = '${tuesdayStatus}',wednesdayStatus = '${wednesdayStatus}',thursdayStatus = '${thursdayStatus}',fridayStatus = '${fridayStatus}',saturdayStatus = '${saturdayStatus}',sundayStatus = '${sundayStatus}',username = '${username}' where id = ${id}`)
    var data = {
        code:200,
    }
    ctx.body = data
})

router.post('/delete', async (ctx,next) => {
    let {id} = ctx.request.body
    await query(`delete from zhibanMsg where id = ${id}`)
    var data = {
        code:200,
    }
    ctx.body = data
})

module.exports = router
// update zhibanMsg set mondayStatus = '${mondayStatus}',tuesdayStatus = '${tuesdayStatus}',wednesdayStatus = '${wednesdayStatus}',thursdayStatus = '${thursdayStatus}',fridayStatus = '${fridayStatus}',saturdayStatus = '${saturdayStatus}',sundayStatus = '${sundayStatus}' where username = ${username}