const router = require('koa-router')()
const query = require('./MYSQL');
router.prefix('/petSpace');
// // 查询所有常见病
router.post('/',async (ctx,next)=>{

    let result = await query(`select * from usuall_fill`)
    var data = {
        code:200,
        result
    }
    ctx.body = data;
})

module.exports = router