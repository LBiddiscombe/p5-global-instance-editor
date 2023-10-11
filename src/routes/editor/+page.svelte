<script lang="ts">
	import type { Sketch } from 'p5-svelte';
	import { AlertOctagon } from 'lucide-svelte';
	import Header from './header.svelte';
	import CodeEditor from './code-editor.svelte';
	import Preview from './preview.svelte';
	import { inputStore, outputStore, inputError } from '$lib/stores/codeStore';

	export let data;

	let sketch: Sketch;
	let selectedExample = '';

	function handleClickExample(example: Example) {
		inputStore.set(example.input);
		selectedExample = example.name;
	}
</script>

<div class="flex flex-col h-screen p-4 gap-4 text-base-content">
	<Header />

	<div class="grid lg:grid-cols-[auto_1fr_1fr] gap-4 flex-grow overflow-auto">
		<div class="flex flex-col overflow-auto">
			<p class="h-10 flex items-center text-sm px-1">Examples</p>
			<ul class="flex flex-col overflow-auto h-full mt-4 gap-2">
				{#each data.examples as example}
					<li class="self-start">
						<button
							class="btn btn-xs rounded"
							class:btn-primary={example.name === selectedExample}
							on:click={() => handleClickExample(example)}>{example.name}</button
						>
					</li>
				{/each}
			</ul>
		</div>

		<CodeEditor />

		<div class="flex flex-col overflow-auto h-full">
			<div class="border border-black flex-grow rounded-2xl flat-shadow m-1 overflow-auto">
				{#key $outputStore}
					<Preview />
				{/key}
			</div>
		</div>
	</div>
	<div class="text-xs">
		{#if $inputError}
			<span class="font-mono flex gap-2 items-center bg-red-500 text-white px-2 py-1"
				><AlertOctagon size={16} />{$inputError}</span
			>
		{/if}
	</div>
</div>
