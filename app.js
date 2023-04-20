const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')
// 引入cors支持跨域请求
const cors = require('koa-cors')
app.use(cors())
// 配置登录页面的路由
const login = require('./routes/login')
const TodayDoc = require('./routes/TodayDoc')
const center = require('./routes/center')
const admin = require('./routes/admin')
const doctor = require('./routes/doctor')
const appUserController = require('./routes/appUserController')
const docUser = require('./routes/docUser')
const hosMsg = require('./routes/hosMsg')
const hosMsg2 = require('./routes/hosMsg2')
const docRelax = require('./routes/docRelax')
const dangAn = require('./routes/dangAn')
const keshiMsg = require('./routes/keshiMsg')
const docMsg = require('./routes/docMsg')
const users = require('./routes/users')
const petSpace = require('./routes/petSpace')
const docCenter = require('./routes/docCenter')
const dkAndqj = require('./routes/dkAndqj')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))
const static = require('koa-static')
// app.use(views(__dirname + '/views', {
//   extension: 'ejs'
// }))
// 静态资源跟路径 serve(path)
app.use(static(path.join(__dirname, 'dist')))
 
app.use(views(path.join(__dirname, 'dist'), {
  extension: 'html'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(login.routes(), login.allowedMethods())
app.use(TodayDoc.routes(),TodayDoc.allowedMethods())
app.use(center.routes(),center.allowedMethods())
app.use(admin.routes(),admin.allowedMethods())
app.use(doctor.routes(),doctor.allowedMethods())
app.use(appUserController.routes(),appUserController.allowedMethods())
app.use(docUser.routes(),docUser.allowedMethods())
app.use(hosMsg.routes(),hosMsg.allowedMethods())
app.use(hosMsg2.routes(),hosMsg2.allowedMethods())
app.use(docRelax.routes(),docRelax.allowedMethods())
app.use(dangAn.routes(),dangAn.allowedMethods())
app.use(keshiMsg.routes(),keshiMsg.allowedMethods())
app.use(docMsg.routes(),docMsg.allowedMethods())
app.use(users.routes(),users.allowedMethods())
app.use(petSpace.routes(),petSpace.allowedMethods())
app.use(docCenter.routes(),docCenter.allowedMethods())
app.use(dkAndqj.routes(),dkAndqj.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  // console.error('server error', err, ctx)
});

// cors设置允许所有域名跨域
// var allowCrossDomin = function(req,res,next){
// 	// 设置请求源
// 	res.header('Access-Control-Allow-Origin','*');
// 	// 设置请求头
// 	res.header('Access-Control-Allow-Headers','*');
// 	// 请求方法
// 	res.header('Access-Control-Allow-Methods','*');
// 	next();
// };
// app.use(allowCrossDomin);

module.exports = app