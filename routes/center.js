const router = require("koa-router")();
const query = require("./MYSQL");
router.prefix("/center");

router.post("/", async (ctx, next) => {
  let userId = ctx.request.body.userId;
    let record = await query(
      `SELECT * FROM orderRecord where userId = ${userId}`
    );
    let result = JSON.parse(JSON.stringify(record));
    console.log(result, "resultresult");
    let routerList = [
      {
        id: "1",
        authName: "我的宠物",
        path: "/Center/myPet",
      },
      {
        id: "2",
        authName: "我的预约",
        path: "/Center/myOrder",
      },
      {
        id: "3",
        authName: "个人信息",
        path: "/Center/myInform",
      },
    ];
    var data = {
      code: 200,
      result,
      routerList,
    };
  ctx.body = data;
});
router.post("/addNewPet", async (ctx, next) => {
  let myPet = ctx.request.body;
  let {
    masterId,
    petAge,
    petCase,
    petId,
    petImg,
    petInform,
    petName,
    petSex,
    petType,
    newPet,
    tabName,
  } = myPet;
  let m = JSON.parse(
    JSON.stringify(
      await query(
        `select username, email, tel from users where userId = '${masterId}'`
      )
    )
  );
  console.log(m, "this is mmmm");
  let { username, email, tel } = m[0];
  let a = await query(
    `insert into petInform(masterId,petAge,petCase,petId,petImg,petInform,petName,petSex,petType,masterName, masterEmail, masterPhone) value(${masterId},'${petAge}','${petCase}',${petId},'${petImg}','${petInform}','${petName}','${petSex}','${petType}','${username}','${email}','${tel}') `
  );
  console.log(JSON.parse(JSON.stringify(a)));
  var data = {
    code: 200,
  };
  ctx.body = data;
});
router.post("/deleteNewPet", async (ctx, next) => {
  let petId = ctx.request.body.petId;
  console.log(petId);
  let a = await query(`DELETE FROM petInform WHERE petId = ${petId}`);
  console.log(JSON.parse(JSON.stringify(a)));
  var data = {
    code: 200,
  };
  ctx.body = data;
});
router.post("/getMyPets", async (ctx, next) => {
  let masterId = ctx.request.body.userId;
  console.log(masterId, "userIduserId");
  let petInform = await query(
    `SELECT * FROM petInform where masterId = ${masterId}`
  );
  let result1 = JSON.parse(JSON.stringify(petInform));
  var data = {
    code: 200,
    result1,
  };
  ctx.body = data;
});
// 获取用户预约详情
router.post("/getMyOrder", async (ctx, next) => {
  let userId = ctx.request.body.userId;
  const page_num = ctx.request.body.page_num; //当前的num
  const page_size = ctx.request.body.page_size; //当前页的数量
  // console.log(ctx.request.body,"111111111111111111")
  let a = await query(
    `select count(*) as total from orderRecord where userId = ${userId}`
  );
  let result = JSON.parse(JSON.stringify(a));
  if (page_num == 1) {
    let a1 = await query(
      `SELECT * FROM orderRecord where userId = ${userId} limit 0,${page_size}`
    );
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
    // let sql = "select * from orderRecord where userId = ${userId} limit ?,?"
    // 分页的原理：当前页码-1乘以显示的总数等于n，m等于显示的条数
    let parmas = [
      (parseInt(page_num) - 1) * parseInt(page_size),
      parseInt(page_size),
    ];
    // console.log(parmas,"parmasparmas")
    let a1 = await query(
      `select * from orderRecord where userId = ${userId} limit ?,?`,
      parmas
    );
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
// 取消预约
router.post("/deleteOrder", async (ctx, next) => {
  let orderId = ctx.request.body.orderId;
  // console.log(masterId,"userIduserId")
  await query(`delete from orderRecord where orderId = ${orderId}`);
  var data = {
    code: 200,
  };
  ctx.body = data;
});
// 获取所有预约
router.post("/getAllOrder", async (ctx, next) => {
  // let userId = ctx.request.body.userId
  const page_num = ctx.request.body.page_num; //当前的num
  const page_size = ctx.request.body.page_size; //当前页的数量
  // console.log(ctx.request.body,"111111111111111111")
  let a = await query(`select count(*) as total from orderRecord`);
  let result = JSON.parse(JSON.stringify(a));
  if (page_num == 1) {
    let a1 = await query(`SELECT * FROM orderRecord limit 0,${page_size}`);
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
    let sql = "select * from orderRecord limit ?,?";
    // 分页的原理：当前页码-1乘以显示的总数等于n，m等于显示的条数
    let parmas = [
      (parseInt(page_num) - 1) * parseInt(page_size),
      parseInt(page_size),
    ];
    // console.log(parmas,"parmasparmas")
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

// 获取指定医生用户的预约
router.post("/getDocOrder", async (ctx, next) => {
  let docId = ctx.request.body.docId;
  const page_num = ctx.request.body.page_num; //当前的num
  const page_size = ctx.request.body.page_size; //当前页的数量
  // console.log(ctx.request.body,"111111111111111111")
  let a = await query(
    `select count(*) as total from orderRecord where docId = ${docId}`
  );
  let result = JSON.parse(JSON.stringify(a));
  if (page_num == 1) {
    let a1 = await query(
      `SELECT * FROM orderRecord where docId = ${docId} limit 0,${page_size}`
    );
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
    // let sql = "select * from orderRecord where docId = ${docId} limit ?,?"
    // 分页的原理：当前页码-1乘以显示的总数等于n，m等于显示的条数
    let parmas = [
      (parseInt(page_num) - 1) * parseInt(page_size),
      parseInt(page_size),
    ];
    // console.log(parmas,"parmasparmas")
    let a1 = await query(
      `select * from orderRecord where docId = ${docId} limit ?,?`,
      parmas
    );
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
module.exports = router;
