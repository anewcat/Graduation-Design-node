const router = require('koa-router')()
const query = require('./MYSQL');
router.prefix('/TodayDoc');
let getDate = require('../api/getDate')
let get7Date = getDate();
// 获取路由表
router.post('/', async (ctx,next) => {
 
    // console.log(result)
    let routerList = [{
        id:"1",
        authName: "面诊预约",
		path: "/DocOrder/faceOrder",
    },
    {
        id:"2",
        authName: "手术预约",
		path: "/DocOrder/operOrder",
    },
    {
        id:"3",
        authName: "美容预约",
		path: "/DocOrder/beautOrder",
    }
]
    var data = {
        code:200,
        routerList
    }
    ctx.body = data
})
// 获取当天在岗医生的信息
// router.post("/getDocOrder",async(ctx,next)=>{
//     let doc = await query(`SELECT * FROM docinform`)
//     let doc1 = JSON.stringify(doc)
//     let docInform = JSON.parse(doc1)
//     // console.log(docInform)
//     let result=[]
//     for(let i = 0;i<7;i++){
//         let obj = {
//             date:get7Date[i],
//             status:[],
//             detail:[]
//         }
//         for(let j=1;j<=5;j++){
//             let docworkTime = 'docworktime'+j
//             let myDate = get7Date[i]
//             // console.log(get7Date,i,myDate,docworkTime)
//             let a = await query(`SELECT status FROM ${docworkTime} where workTime = '${myDate}'`)
//             var dataString = JSON.stringify(a);
//             var r = JSON.parse(dataString)
//             r[0].status == 1?obj.status.push(docInform[j-1]):obj.status.push(null)
//         }
//         result.push(obj)
//     }
//     let data = {
//         code:200,
//         result
//     }
//     ctx.body = data
// })
// // 获取每位在岗医生当天各个时间段的安排
// router.post("/detail",async (ctx,next)=>{
//     let date1 = ctx.request.body.date;
//     let doc1workTime = "docworktime"+ctx.request.body.id;
//     // console.log(date1,doc1workTime,"date1和docworkTime")
//     // console.log(ctx,"ctxctxctx")
//     let a = await query(`select am1, am2, pm1, pm2 FROM ${doc1workTime} WHERE worktime = '${date1}'`)
//     let result1 = JSON.parse(JSON.stringify(a));
//     // console.log(result1)
//     let result2 = [];
//     result2.push(result1[0].am1,result1[0].am2,result1[0].pm1,result1[0].pm2)
//     // console.log(result2,"result2")
//     ctx.body = {
//         code:200,
//         detail:result2,
//         index:ctx.request.body.id-1
//     }
// })

// // 更新在岗医生时间安排
// router.post("/newOrder",async (ctx,next)=>{
//     let date2 = ctx.request.body.date;
//     let doc2workTime = "docworktime"+ctx.request.body.id;
//     let index2 = ctx.request.body.index1
//     console.log(date2,doc2workTime,index2,"date1和docworkTime和index2")
//     // console.log(ctx,"ctxctxctx")
//     let time = "";
//     switch(index2){
//         case 0 : 
//             time = "am1"
//             break;
//         case 1 :
//             time = "am2"
//             break;
//         case 2 :
//             time = "pm1"
//             break;
//         case 3 :
//             time = "pm2"
//             break;

//     }
//     console.log(time,"timetime")
//     let a = await query(`update  ${doc2workTime} set ${time} = "1" WHERE worktime = '${date2}'`)
//     console.log(a,"这里是aaaa")
//     // let result1 = JSON.parse(JSON.stringify(a));
//     // console.log(result1)
//     // let result2 = [];
//     // result2.push(result1[0].am1,result1[0].am2,result1[0].pm1,result1[0].pm2)
//     // console.log(result2,"result2")
//     ctx.body = {
//         code:200,
//         // detail:result2,
//         // index:ctx.request.body.id-1
//     }
// })
// // 向数据库添加预约记录
// router.post("/orderRecord",async (ctx,next)=>{
//     let {userId, docId, orderTime, detailTime} = ctx.request.body
//     console.log(userId, docId, orderTime, detailTime,"canshucanshucanshu")
//     let a = await query(`insert into orderRecord(userId,docId,orderTime,detailTime) value('${userId}','${docId}','${orderTime}','${detailTime}') `)
//     ctx.body={
//         code:200
//     }
// })

// 获取所有的科室信息
router.post("/keshi",async (ctx,next)=>{
    let a = JSON.parse(JSON.stringify(await query(`select keshi from keshiMsg`)))
    // let resArr = []
    
    // a.forEach((item)=>{
    //     // console.log(item)
    //     // keshiArr.push(item.keshi)
    //     query(`select * from zhibanMsg where keshi = '${item.keshi}'`).then(res=>{
    //     let myValue = JSON.parse(JSON.stringify(res)) 
    //     // console.log(myValue,"myValuemyValue")        
    //     var data = {
    //         name:item.keshi,
    //         value:myValue
    //     }
    //     // resArr.push(data)
    //     // console.log(res,"this is res")
    //     })
    // })
    // console.log(resArr,"this is result")
    // resArr = [1,2,3,4]
    ctx.body={
        code:200,
        result:a
    }
})

// 获取指定可是中的所有医生
router.post("/keshiDoc",async (ctx,next)=>{
    let keshi = ctx.request.body.keshi
    let result = JSON.parse(JSON.stringify(await query(`select * from docInform where keshi = '${keshi}'`)))
    ctx.body={
        code:200,
        result
    }
})
//查询医生的详细信息
router.post("/DocDetail",async (ctx,next)=>{
    let userId = ctx.request.body.userId
    let result = JSON.parse(JSON.stringify(await query(`select * from docInform where docId = '${userId}'`)))
    let result1 = JSON.parse(JSON.stringify(await query(`select * from zhibanMsg where userId = '${userId}'`)))
    ctx.body={
        code:200,
        result,
        result1
    }
})
//用户的宠物
router.post("/myPets",async (ctx,next)=>{
    let userId = ctx.request.body.userId
    let result = JSON.parse(JSON.stringify(await query(`select petName,petId from petInform where masterId = '${userId}'`)))
    // console.log(result,"this is myPets")
    ctx.body={
        code:200,
        result
    }
})
// 添加预约记录
router.post("/addOrder",async (ctx,next)=>{
    // let userId = ctx.request.body.userId
    let {userId,orderTime,detailTime,petId,docName,docId,orderType} = ctx.request.body
    let petName = JSON.parse(JSON.stringify(await query(`select petName from petInform where petId = ${petId}`)))[0].petName
    // console.log(userId,orderTime,detailTime,petId,docName,petName,orderType)
    let result = JSON.parse(JSON.stringify(await query(`insert into orderRecord(userId,docId,orderTime,detailTime,petId,petName,docName,orderType) value(${userId},${docId},'${orderTime}',${detailTime},${petId},'${petName}','${docName}','${orderType}')`)))
    // console.log(result,"this is myPets")
    ctx.body={
        code:200,
        result
    }
})
// 查询医生某天的预约情况
router.post("/selectTime",async (ctx,next)=>{
    // let userId = ctx.request.body.userId
    let orderTime = ctx.request.body.orderTime
    let docId = ctx.request.body.docId
    console.log(orderTime)
    let result = JSON.parse(JSON.stringify(await query(`select detailTime from orderRecord where orderTime = '${orderTime}' and docId = ${docId}`)))
    console.log(result,"selectTime")
    ctx.body={
        code:200,
        result
    }
})
module.exports = router