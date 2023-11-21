<script lang="ts">
    export let allowInput: boolean = false;

    let input: HTMLInputElement;
    let terminal: HTMLDivElement;
    let inputListeners: Array<Function> = [];
    let stuckScroll: boolean = true;

    enum LineType {
        Input,
        Output
    };

    let lines: Array<Line> = [];

    interface Line {
        type: LineType;
        content: String;
    };

    export function focusInput() {
        input?.focus();
    };

    function addLine(line: Line) {
        lines = [...lines, line];

        if (stuckScroll) {
            terminal.scrollTop = terminal.scrollHeight;
        }
    };

    export function addOutputLine(content: String) {
        addLine({
            type: LineType.Output,
            content
        });
    };

    export function addInputLine(content: String) {
        addLine({
            type: LineType.Input,
            content
        });
    };

    export function clearLines() {
        lines = [];
    };

    export function clearInput() {
        input.value = "";
    };

    export function addInputListener(listener: Function) {
        inputListeners = [...inputListeners, listener];
    };

    function handleInput(event: KeyboardEvent) {
        if (event.key == "Enter") {
            const value = input.value;
            
            addInputLine(value);
            clearInput();

            inputListeners.forEach((listener) => {
                listener(value);
            });
        }
    };

    function handleScroll() {
        stuckScroll = terminal.scrollTop + terminal.clientHeight >= terminal.scrollHeight;
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex flex-col bg-gray-900 text-2xl h-full overflow-y-scroll overflow-x-hidden" id="terminal" on:click={focusInput} bind:this={terminal} on:scroll={handleScroll}>

    {#each lines as line}
        {#if line.type == LineType.Input}
            <div class="text-white break-words">{line.content}</div>
        {:else if line.type == LineType.Output}
            <div class="text-green-400 break-words">{line.content}</div>
        {/if}
    {/each}

    {#if allowInput}
        <input type="text" class="bg-gray-900 text-white" id="input" bind:this={input} on:keydown={handleInput} />
    {/if}
</div>

<style>
    #terminal {
        font-family: "Fira Code", monospace;
    }

    #input {
        outline: transparent;
    }
</style>