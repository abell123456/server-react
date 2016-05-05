/**!
 * react-server-koa-simple - app.js
 * application
 */
'use strict';

const koa = require('koa');
const koaRouter = require('koa-router');
const path = require('path');

// 提供了react server render的功能
const reactview = require('./app/plugin/reactview/app.js');
// 提供将请求路由与中间件或者应用对应的功能
const Static = require('./app/middleware/static.js');
const VERSION = require('./app/assets/package.json').version;

const app = koa();
// 使用koaRouter中间件
const router = koaRouter();

// 留意下这个数据的用处
const microdata = {
    styleDomain: "//localhost:3000",
    styleVersion: VERSION
};

// ######### 下面是对应不同路由的操作 ########
// 初始化/home路由dispatch的generator
router.get(['/', '/home'], function*() {
    // 执行view插件，该插件就是reactview提供过来的
    this.body = this.render('Home', {
        // 配置用数据
        microdata: microdata,
        // 渲染用数据
        mydata: {
            nick: 'server render body'
        }
    });
});

router.get('/device/:deviceID', function*() {
    // 执行view插件
    const deviceID = this.params.deviceID;
    this.body = this.render('Device', {
        isServer: true,
        microdata: microdata,
        mydata: {
            path: this.path,
            deviceID: deviceID,
        }
    });
});

// 使用上面的路由配置
app.use(router.routes()).use(router.allowedMethods());

// 静态资源托管
app.use(Static({
    staticOpts: {
        router: '/assets', // 路由映射
        dir: `${__dirname}/app/assets`, // 托管的目录
        maxage: 1000 * 3600 * 24 // 设置 maxage，默认缓存一天
    },
    app: app
}));

// 注入reactview
const viewpath = path.join(__dirname, 'app/views');

app.config = {
    reactview: {
        viewpath: viewpath, // the root directory of view files
        doctype: '<!DOCTYPE html>',
        extname: '.js', // view层直接渲染文件名后缀
        beautify: true, // 是否需要对dom结构进行格式化
        writeResp: false, // 是否需要在view层直接输出
    }
};

// 为app提供服务端渲染的能力
reactview(app);

// http服务端口监听
app.listen(3000, () => {
    console.log('3000 is listening!');
});