const router = require('koa-router')()
const query = require('./MYSQL');
router.prefix('/docMsg');
// // 获取所有用户信息
router.post('/',async (ctx,next)=>{

    // let id = 1
    let result = await query(`select * from docInform`)
    var data = {
        code:200,
        result
    }
    ctx.body = data
})
// 获取某个医生用户的信息
router.post('/doctor',async (ctx,next)=>{

    let docId = ctx.request.body.docId
    let result = await query(`select * from docInform where docId = ${docId}`)
    var data = {
        code:200,
        result
    }
    ctx.body = data
})

// 更新医生信息
router.post('/update',async (ctx,next)=>{

    let {docName, docAge, docInform, docImg, docPass, docEmail, docTel, docSex, keshi ,docId} = ctx.request.body
    let result = await query(`update docInform set docName = '${docName}', docAge = '${docAge}', docInform = '${docInform}', docImg = '${docImg}', docPass = '${docPass}', docEmail = '${docEmail}', docTel = '${docTel}', docSex = '${docSex}', keshi = '${keshi}' where docId = ${docId}`)
    var data = {
        code:200,
        result
    }
    ctx.body = data
})
module.exports = router