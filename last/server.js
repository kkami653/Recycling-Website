const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
// 提供静态文件服务
app.use(express.static('public'));
// 使用中间件解析 JSON 数据
app.use(express.json());

// 用户注册路由
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // 验证用户名和密码是否为空
  if (!username || !password||!email) {
    res.json({ success: false, message: "用户名、邮箱和密码不能为空" });
  }

  // 模拟读取本地的用户数据文件
  fs.readFile('./user.json', (err, data) => {
    if (err) {

      return res.status(500).send('读取用户数据失败');
    }

    const users = JSON.parse(data);

    // 检查用户名是否已存在
    if (users.some(user => user.username === username)) {
      return res.status(400).json({ message: "用户名已存在"});
    }

    // 添加新用户
    users.push({ username,email, password });

    // 保存更新后的用户数据
    fs.writeFile('./user.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "保存用户数据失败" });
      }
      res.json({ message: "注册成功" });
    });
  });
});
// 用户登录路由
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 验证用户名和密码是否为空
  if (!username || !password) {
    return res.status(400).json({ message: "用户名和密码不能为空" });
  }

  // 模拟读取本地的用户数据文件
  fs.readFile('./user.json', (err, data) => {
    if (err) {
      return res.status(500).json({message:'读取用户数据失败'});
    }

    const users = JSON.parse(data);

    // 检查用户名是否已存在
    if (users.some(user => user.username === username&&user.password===password)) {
      res.json({ success: true, message: "登录成功" });
    }
    else{
      return res.status(400).json({message:'用户名或密码错误'});
    }

  });
});

// 启动服务器
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});