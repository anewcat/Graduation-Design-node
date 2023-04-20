const router = require('koa-router')()
const query = require('./MYSQL');
router.prefix('/hosMsg');

router.post('/', async (ctx,next) => {
    let id = 1
    let result = await query(`select * from hosMsg where id = ${id}`)
    var data = {
        code:200,
        result
    }
    ctx.body = data
})

router.post('/edit', async (ctx,next) => {
    let {hosname,tel,address,introduce} = ctx.request.body
    let id = 1
    console.log(hosname,tel,address,introduce)
    await query(`update hosMsg set hosname = '${hosname}',tel = '${tel}',address = '${address}',introduce = '${introduce}' where id = ${id}`)
    var data = {
        code:200,
    }
    ctx.body = data
})
module.exports = router