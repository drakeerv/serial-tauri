import { c as create_ssr_component, d as add_attribute, f as each, e as escape, v as validate_component } from "../../chunks/ssr.js";
import "@tauri-apps/api/tauri";
const Terminal_svelte_svelte_type_style_lang = "";
const css = {
  code: '#terminal.svelte-17239dh{font-family:"Fira Code", monospace}#input.svelte-17239dh{outline:transparent}',
  map: null
};
const Terminal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { allowInput = false } = $$props;
  let input;
  let terminal;
  let inputListeners = [];
  var LineType = /* @__PURE__ */ ((LineType2) => {
    LineType2[LineType2["Input"] = 0] = "Input";
    LineType2[LineType2["Output"] = 1] = "Output";
    return LineType2;
  })(LineType || {});
  let lines = [];
  function focusInput() {
  }
  function addLine(line) {
    lines = [...lines, line];
    {
      terminal.scrollTop = terminal.scrollHeight;
    }
  }
  function addOutputLine(content) {
    addLine({
      type: 1,
      /* Output */
      content
    });
  }
  function addInputLine(content) {
    addLine({
      type: 0,
      /* Input */
      content
    });
  }
  function clearLines() {
    lines = [];
  }
  function clearInput() {
    input.value = "";
  }
  function addInputListener(listener) {
    inputListeners = [...inputListeners, listener];
  }
  if ($$props.allowInput === void 0 && $$bindings.allowInput && allowInput !== void 0)
    $$bindings.allowInput(allowInput);
  if ($$props.focusInput === void 0 && $$bindings.focusInput && focusInput !== void 0)
    $$bindings.focusInput(focusInput);
  if ($$props.addOutputLine === void 0 && $$bindings.addOutputLine && addOutputLine !== void 0)
    $$bindings.addOutputLine(addOutputLine);
  if ($$props.addInputLine === void 0 && $$bindings.addInputLine && addInputLine !== void 0)
    $$bindings.addInputLine(addInputLine);
  if ($$props.clearLines === void 0 && $$bindings.clearLines && clearLines !== void 0)
    $$bindings.clearLines(clearLines);
  if ($$props.clearInput === void 0 && $$bindings.clearInput && clearInput !== void 0)
    $$bindings.clearInput(clearInput);
  if ($$props.addInputListener === void 0 && $$bindings.addInputListener && addInputListener !== void 0)
    $$bindings.addInputListener(addInputListener);
  $$result.css.add(css);
  return `  <div class="flex flex-col bg-gray-900 text-2xl h-full overflow-y-scroll overflow-x-hidden svelte-17239dh" id="terminal"${add_attribute("this", terminal, 0)}>${each(lines, (line) => {
    return `${line.type == LineType.Input ? `<div class="text-white break-words">${escape(line.content)}</div>` : `${line.type == LineType.Output ? `<div class="text-green-400 break-words">${escape(line.content)}</div>` : ``}`}`;
  })} ${allowInput ? `<input type="text" class="bg-gray-900 text-white svelte-17239dh" id="input"${add_attribute("this", input, 0)}>` : ``} </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ports = [];
  let portOpen = false;
  let terminal;
  let selectedBaudRate = 9600;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex flex-col h-screen"><div class="flex-none h-12 bg-gray-600 text-white flex items-center justify-center"><div class="flex-none w-1/4 flex items-center justify-center"><select class="bg-gray-900 text-white"><option disabled selected value="" data-svelte-h="svelte-b0iee1">Select a port</option>${each(ports, (port) => {
      return `<option${add_attribute("value", port, 0)}>${escape(port)}</option>`;
    })}</select></div> <div class="flex-none w-1/4 flex items-center justify-center"><input class="bg-gray-900 text-white" type="number" placeholder="Baud rate" min="0" step="1"${add_attribute("value", selectedBaudRate, 0)}></div> <div class="flex-none w-1/4 flex items-center justify-center">${`<button class="bg-gray-900 text-white" data-svelte-h="svelte-1ulfnmy">Open</button>`}</div> <div class="flex-none w-1/4 flex items-center justify-center"><button class="bg-gray-900 text-white" data-svelte-h="svelte-511dyv">Clear</button></div></div> <div class="flex-grow bg-gray-900 text-white">${validate_component(Terminal, "Terminal").$$render(
      $$result,
      { allowInput: portOpen, this: terminal },
      {
        this: ($$value) => {
          terminal = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
