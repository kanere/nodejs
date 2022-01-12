// 引入express包
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')

// 创建服务器应用程序
var app = express()

// 开放静态资源
app.use('/node_modules/', express.static('./node_modules/'))

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// 配置art-template模版
app.engine('html', require('express-art-template'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 把路由容器挂载到 app 服务中
app.use(router)

// 启动监听
app.listen(3000, () => {
  console.log('3000 port listening...')
})
