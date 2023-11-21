export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","favicon.png"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.a1c5f198.js","app":"_app/immutable/entry/app.5188aba4.js","imports":["_app/immutable/entry/start.a1c5f198.js","_app/immutable/chunks/scheduler.b95eede2.js","_app/immutable/chunks/singletons.8f3cbe28.js","_app/immutable/entry/app.5188aba4.js","_app/immutable/chunks/scheduler.b95eede2.js","_app/immutable/chunks/index.85ecae09.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
