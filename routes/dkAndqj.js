const router = require("koa-router")();
const query = require("./MYSQL");
router.prefix("/dkAndqj");

router.post("/insertDK", async (ctx, next) => {
  let { docId, name, keshi, status } = ctx.request.body;
  let myDate = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);

  let time = myDate.toJSON().split("T").join(" ").slice(0, 19);
  // console.log(time)
  await query(
    `insert into dakaMsg(docId, name, keshi, status, time) value('${docId}', '${name}', '${keshi}', '${status}', '${time}')`
  );
  var data = {
    code: 200,
  };
  ctx.body = data;
});
// 查询某人某天是否打卡
router.post("/selectDK", async (ctx, next) => {
  let { docId, time } = ctx.request.body;
  // console.log(time)
  let res = await query(`select time from dakaMsg where docId = ${docId}`);
  let result = [];
  res.forEach((item) => {
    console.log(item);
    result.push(String(item.time).split(" ")[0]);
    // console.log(String(item.time))
  });
  var data = {
    code: 200,
    result,
  };
  ctx.body = data;
});
// 医生的姓名和科室
router.post("/selectDoc", async (ctx, next) => {
  let { docId } = ctx.request.body;
  // console.log(time)
  let res = await query(
    `select docName, keshi from docInform where docId = ${docId}`
  );
  console.log(res, "resresres");
  var data = {
    code: 200,
    res,
  };
  ctx.body = data;
});
// 添加新的请假
router.post("/insertQJ", async (ctx, next) => {
  let { docId, name, keshi, time, detail, type } = ctx.request.body;
  let myStatus = ctx.request.body.status
  await query(
    `insert into qingjiaMsg(docId, name, keshi,time,detail,type,status) value(${docId}, '${name}', '${keshi}','${time}','${detail}','${type},'${myStatus}')`
  );
  var data = {
    code: 200,
  };
  ctx.body = data;
});
// 查询请假情况
router.post("/selectQJ", async (ctx, next) => {
  const query_data = ctx.request.body.query_data;
  const page_num = ctx.request.body.page_num; //当前的num
  const page_size = ctx.request.body.page_size; //当前页的数量
  const docId = ctx.request.body.docId;
  let a = await query(`select count(*) as total from qingjiaMsg`);
  let result = JSON.parse(JSON.stringify(a));
  // console.log(page_num,page_size)
  var data = {};
  if (page_num == 1) {
    let a1 = await query(`select * from qingjiaMsg limit 0,${page_size}`);
    let result1 = JSON.parse(JSON.stringify(a1));
    // console.log(result1,"resultresultresult123123123")
    data = {
      code: 200,
      paging: {
        page_num: page_num,
        page_size: page_size,
        total: result[0].total,
      },
      data: result1,
    };
  } else {
    // 页码不是第一页
    // 没有指定搜索内容
    // 列表模块   limit 参数 n,m  n表示开始的那条数据，从0开始
    let sql = "select * from qingjiaMsg limit ?,?";
    // 分页的原理：当前页码-1乘以显示的总数等于n，m等于显示的条数
    let parmas = [
      (parseInt(page_num) - 1) * parseInt(page_size),
      parseInt(page_size),
    ];
    console.log(parmas, "parmasparmas");
    let a1 = await query(sql, parmas);
    let result1 = JSON.parse(JSON.stringify(a1));
    // console.log(result1,"resultresultresult6666666666666666666")
    data = {
      code: 200,
      paging: {
        page_num: page_num,
        page_size: page_size,
        total: result[0].total,
      },
      data: result1,
    };
  }
  ctx.body = data;
});
// 撤销请假申请
router.post("/deleteQJ", async (ctx, next) => {
  let { id } = ctx.request.body;
  // console.log(time)
  await query(`delete from qingjiaMsg where id = ${id}`);
  var data = {
    code: 200,
  };
  ctx.body = data;
});
module.exports = router;
