<script lang="ts">
    import { invoke } from "@tauri-apps/api/tauri";
    import Terminal from "../comp/Terminal.svelte";
    import { onMount } from "svelte";

    let ports: Array<String> = [];
    let portOpen: boolean = false;
    let terminal: Terminal;

    let selectedPort: String = "";
    let selectedBaudRate: Number = 9600;

    function loadPorts() {
        invoke("list_ports").then((res) => {
            const newPorts = res as Array<String>;

            if (!newPorts.includes(selectedPort)) {
                selectedPort = "";
                portOpen = false;
            }

            ports = newPorts;
        })
    }

    function openPort(portName: String, baudRate: Number) {
        invoke("open_port", { portName, baudRate }).then((res) => {
            portOpen = true;
            terminal.focusInput();
        }).catch((err) => {
            console.log(err);
        })
    }

    function closePort() {
        invoke("close_port").then((res) => {
            portOpen = false;
        })
    }

    function writeData(data: String) {
        invoke("write_data", { data }).then((res) => {
            console.log(res);
        })
    }

    function readData() {
        invoke("read_data").then((res) => {
            console.log(res);
        })
    }

    onMount(() => {
        setInterval(() => {
            loadPorts();
        }, 1000);

        terminal.addInputListener((data: String) => {
            writeData(data);
        });
    })
</script>

<div class="flex flex-col h-screen">
    <div class="flex-none h-12 bg-gray-600 text-white flex items-center justify-center">
        <div class="flex-none w-1/4 flex items-center justify-center">
            <select class="bg-gray-900 text-white" bind:value={selectedPort}>
                <option disabled selected value="">Select a port</option>
                {#each ports as port}
                    <option value={port}>{port}</option>
                {/each}
            </select>
        </div>
        <div class="flex-none w-1/4 flex items-center justify-center">
            <input class="bg-gray-900 text-white" bind:value={selectedBaudRate} type="number" placeholder="Baud rate" min="0" step="1" />
        </div>
        <div class="flex-none w-1/4 flex items-center justify-center">
            {#if portOpen}
                <button class="bg-gray-900 text-white" on:click={() => closePort()}>Close</button>
            {:else}
                <button class="bg-gray-900 text-white" on:click={() => openPort(selectedPort, selectedBaudRate)}>Open</button>
            {/if}
        </div>
        <div class="flex-none w-1/4 flex items-center justify-center">
            <button class="bg-gray-900 text-white" on:click={() => terminal.clearLines()}>Clear</button>
        </div>
    </div>
    <div class="flex-grow bg-gray-900 text-white">
        <Terminal bind:this={terminal} allowInput={portOpen} />
    </div>
</div>