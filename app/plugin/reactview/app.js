/**
 * 提供 react server render 功能
 *
 * {
 *   options : {
 *     viewpath: viewpath,                 // the root directory of view files
 *     doctype: '<!DOCTYPE html>',
 *     extname: '.js',                     // view层直接渲染文件名后缀
 *     beautify: true,                     // 是否需要对dom结构进行格式化
 *     writeResp: true,                    // 是否需要在view层直接输出
 *   }
 * }
 */

'use strict';

/**
 * Module dependencies.
 */
const util = require('util');
const assert = require('assert');
const path = require('path');
const beautifyHTML = require('js-beautify').html;
const ReactDOMServer = require('react-dom/server');
const React = require('react');

require('debug').enable('reactview');
const log = require('debug')('reactview');

require('babel-register');

// 一些默认配置项，防止某些参数未传入的时候报错
const defaultOpts = {
    doctype: '<!DOCTYPE html>',
    extname: '.js', // view层直接渲染文件名后缀
    beautify: false, // 是否需要对dom结构进行格式化
    writeResp: false, // 是否需要在view层直接输出
    internals: true
};

// app即为koa应用实例
module.exports = function(app) {
    /**
    * 目前传入的格式如下：
    // 服务端React Components
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
    */

    const opts = app.config.reactview || {};

    assert(opts && opts.viewpath && util.isString(opts.viewpath), '[reactview] viewpath is required, please check config!');

    const options = Object.assign({}, defaultOpts, opts);
    // 中间件当中的this表示上下文对象context，代表一次HTTP请求和回应，即一次访问/回应的所有信息，
    // 都可以从上下文对象获得。context对象封装了request和response对象，并且提供了一些辅助方法。
    // 每次HTTP请求，就会创建一个新的context对象。
    // 这样，在app this中就可以直接使用render()方法
    /**
        _locals配置：
    {
        microdata: microdata,
        mydata: {
            nick: 'server render body'
        }
    }
    */
    app.context.render = function(filename, _locals, internals, children) {
        // filename: Home/Device
        let filepath = path.join(options.viewpath, filename);

        // 将filepath组装成完整的js文件路径
        if (!path.extname(filepath)) {
            filepath += options.extname;
        }

        // filepath可能值：app/views/Home.js

        // 保证_locals是一个配置对象
        if (typeof _locals === 'boolean') {
            internals = _locals;
            _locals = {};
        }

        // 用于指定是简单的纯文本页面还是交互较多的页面，如上两点最终会导致在服务端渲染后的HTML字符串是否带有react id
        internals = internals !== undefined ? internals : options.internals;
        // 关键点
        let render = internals ? ReactDOMServer.renderToString : ReactDOMServer.renderToStaticMarkup;

        // merge koa state(一些渲染用到的数据全部传给props，此props是给React.createElement创建组件用的时候传入的数据)
        let props = Object.assign({}, this.state, _locals);
        let markup = options.doctype || '<!DOCTYPE html>';

        try {
            let component = require(filepath);
            // Transpiled ES6 may export components as { default: Component }
            component = component.default || component;

            // 执行渲染
            markup += render(React.createElement(component, props, children));
        } catch (err) {
            err.code = 'REACT';
            throw err;
        }

        if (options.beautify) {
            // NOTE: This will screw up some things where whitespace is important, and be
            // subtly different than prod.
            markup = beautifyHTML(markup);
        }

        log('[markup:]', markup);

        if (options.writeResp) {
            this.type = 'html';
            this.body = markup;
        }

        return markup;
    };
};