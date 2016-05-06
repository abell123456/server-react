# server-react
服务端渲染react，实现同构；数据mock，前端开发不用再等java/php等其他服务端；遵循约定，将接口数据转化为前端可用的JSON格式。

## 参考资料收集
React同构实践与思考：http://zhuanlan.zhihu.com/p/20669111  
图解基于node.js实现前后端分离：http://yalishizhude.github.io/2016/04/19/front-back-separation/  
接口调试（下）——让接口服务器为前后端解耦：http://yalishizhude.github.io/2016/01/06/api-test-3/  
React同构实践：http://www.stuq.org/courseware/987/1194  
Swagger - 前后端分离后的契约：http://www.cnblogs.com/whitewolf/p/4686154.html  
IntegrationContractTest：http://martinfowler.com/bliki/IntegrationContractTest.html  
Mock.js：http://mockjs.com/  
也谈基于NodeJS的全栈式开发（基于NodeJS的前后端分离）：http://ued.taobao.org/blog/2014/04/full-stack-development-with-nodejs/  
JSON Schema（##important##）:http://json-schema.org  
贴吧 React 最佳实践: https://github.com/fex-team/fit/issues/1

## 大致实现

### 数据mock  
根据接口文档约定的接口模式，自动生成测试数据（Mock.js），提供给前端使用，这样前端同学就不需要再等待java等开发来提供数据。这一块可在数据mock服务器实现。

### 使用java提供的数据
java开发人员不需要关心数据提供的具体格式，只需要遵循`前后端分离的契约`提供数据，Node.js通过接口服务器请求数据过来后，通过json-map/json-transform等将数据转化为前端可以使用的json数据格式。

### 实现同构
使用基于react等的前端框架，实现前端模板在服务端的渲染，提升浏览器首次渲染的时候的打开速度，同时也解决前后端分离seo的问题。

## 目前的实现
目前只是实现了前后端的基于React的同构。运行步骤如下：

	* 1.2.1、安装依赖包：npm install
 	* 1.2.2、运行 node app

	* 打开页面：<http://localhost:3000/home>

## 目录结构
```
server-react
├── app
│   ├── assets (静态资源目录，可选)
│   │   ├── build
│   │   ├── src
│   │   │    ├── img
│   │   │    ├── js
│   │   │    └── css
│   │   ├── package.json（前端独有依赖）
│   │   └── webpack.config.js（不解释）
│   ├── middleware (你应用的中间件)
│   │   └── static.js（前端静态资源托管中间件）
│   ├── plugin (可选)
│   │   └── reactview（reactview插件）
│   └── views (可选，由 view 插件规范)
│       ├── layout
│       │    └── Default.js
│       ├── Device.js
│       └── Home.js
├── .babelrc
├── .gitgnore
├── app.js
├── package.json
└── README.md
```
