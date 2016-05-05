/**!
 * project - filepath
 * description
 */
'use strict';

// Mount middleware at specific paths, allowing them to operate independently of the prefix, 
// as they're not aware of it.
const mount = require('koa-mount');
const staticCache = require('koa-static-cache');

module.exports = function(opts, app) {
	let options = opts.staticOpts;

console.log('options.router:', options.router); // /assets

	// 静态文件的缓存
	return mount(options.router, staticCache(options.dir, {
		maxAge: options.maxage,
		buffer: true,
	}));
};