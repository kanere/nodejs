const fs = require('fs')
// Express 提供了一种更好的方式
// 专门用来包装路由的
var express = require('express')

// 1. 创建一个路由容器
var router = express.Router()

// 2. 把路由都挂载到 router 路由容器中

// 页面-学生列表主页
router.get('/', (req, res) => {
  // 自己读取html页面进行渲染
  // fs.readFile('./view/index.html', 'utf-8', (err, data) => {
  //   if (err) console.log('文件读取失败。。。' + err)
  //   res.send(data)
  // })

  let students = []
  fs.readFile('./db.json', 'utf-8', (err, data) => {
    if (err) console.log('文件读取失败。。。' + err)
    students = JSON.parse(data).students
    // art-template模版渲染
    res.render('index.html', {
      students
    })
  })
})

// 页面-新增学生
router.get('/toAddPage', (req, res) => {
  res.render('addStudent.html', {})
})

// 接口-新增学生
router.post('/add', (req, res) => {
  console.log('接口-新增学生')
  let students = []
  fs.readFile('./db.json', 'utf-8', (err, data) => {
    if (err) console.log('文件读取失败。。。' + err)
    students = JSON.parse(data).students
    const stu = req.body
    stu.id = students[students.length - 1].id + 1
    students.push(stu)
    // 写入文件
    fs.writeFile('./db.json', JSON.stringify({ students }), (err) => {
      if (err) console.log('文件写入失败。。。' + err)
      res.redirect('/')
    })
  })
})

// 3. 把 router 导出
module.exports = router
