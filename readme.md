### 每日一文
#### 初探koa2练习demo
---
### 项目结构
```bash
.
├── app.js
├── controller.js
├── controllers
│   └── api.js
├── node_modules
├── package.json
└── readme.md
```
---
### api

```bash
获取今日文章
'GET /api/today'
```

```bash
获取某日文章
'GET /api/oneart?date=xxx'
```

```bash
获取随机一条数据
'GET /api/random'
```

获取多条数据
'POST /api/articles'
{date:xxx}
```
只是最基本的使用..很多东西都还没有处理..现在只是能正确的提供数据..