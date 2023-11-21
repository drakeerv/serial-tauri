import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.19a1b925.js","_app/immutable/chunks/scheduler.b95eede2.js","_app/immutable/chunks/index.85ecae09.js"];
export const stylesheets = ["_app/immutable/assets/0.0cf88987.css"];
export const fonts = [];
