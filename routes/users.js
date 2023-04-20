const router = require("koa-router")();
const query = require("./MYSQL");
router.prefix("/users");
// // 获取用户列表信息和查询用户信息
router.post("/", async (ctx, next) => {
  let userId = ctx.request.body.userId;
  let result = await query(`select * from users where userId = ${userId}`);
  var data = {
    code: 200,
    result,
  };
  ctx.body = data;
});
router.post("/update", async (ctx, next) => {
  let { username, password, email, tel, address, userId } = ctx.request.body;
  let result = await query(
    `update users set username = '${username}', password = '${password}', email = '${email}', tel = '${tel}', address = '${address}' where userId = '${userId}'`
  );
  var data = {
    code: 200,
    result,
  };
  ctx.body = data;
});

module.exports = router;
