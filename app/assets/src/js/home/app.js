/**!
 * react-server-koa-simple /app/assets/src/js/home/app.js
 * clientRender entry for home page
 */
'use strict';

import {render} from 'react-dom';
import React, {Component, PropTypes} from 'react';
import Content from './components/Content';

// 此时已经渲染到浏览器页面中，所以可以拿到元素
const appEle = document.getElementById('demoApp');

// 拿到从服务端传入的数据
let microdata = JSON.parse(appEle.getAttribute('data-microdata'));
let mydata = JSON.parse(appEle.getAttribute('data-mydata'));

mydata.nick += ', then client reRender ';

// 客户端再次渲染组件
// 要领：因为该组件已经渲染到浏览器，如果对他的DOM结构没有更改，那么其实基于DOM Diff算法他其实不会重新渲染html，
// 只是会进行绑定事件等其他操作
// 这样就能加快React组件渲染速度
render(<Content mydata={mydata} microdata={microdata} /> , appEle);
