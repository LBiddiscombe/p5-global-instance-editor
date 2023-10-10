<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { javascript } from '@codemirror/lang-javascript';
	import { clouds } from 'thememirror';
	import { starterCode } from './starter-code';
	import type { Sketch } from 'p5-svelte';
	import Logo from '$lib/components/p5-logo.svelte';
	import { PlayCircle, Home, Info, AlertOctagon } from 'lucide-svelte';
	import Preview from './preview.svelte';
	import { inputStore, outputStore, inputError } from '$lib/stores/codeStore';
	import { onMount } from 'svelte';

	export let data;

	console.log(data);

	let isEditorActive = true;
	let sketch: Sketch;

	onMount(() => {
		if ($inputStore === '') {
			inputStore.set(starterCode);
		}
	});
</script>

<div class="flex flex-col h-screen p-4 gap-4 text-base-content">
	<div class="flex justify-between items-center">
		<a
			href="/"
			class="rounded-full bg-yellow-400 hover:bg-yellow-300 hover:shadow-[4px_4px_#282825] transition-all p-2 shadow-[2px_2px_#282825] border border-[#282825]"
		>
			<Home size={32} strokeWidth={1} absoluteStrokeWidth={true} />
		</a>
		<h1 class="p-4 text-3xl font-bold">
			<Logo /> global to instance editor
		</h1>
		<div class="invisible">
			<Info />
		</div>
	</div>

	<div class="grid lg:grid-cols-[auto_1fr_1fr] gap-4 flex-grow overflow-auto">
		<div class="flex flex-col overflow-auto">
			<p class="h-10 flex items-center text-sm px-1">Examples</p>
			<ul class="flex flex-col overflow-auto h-full mt-4 gap-2">
				{#each data.examples as example}
					<li class="self-start border border-base-content rounded">
						<button class="btn btn-xs" on:click={() => inputStore.set(example.input)}
							>{example.name}</button
						>
					</li>
				{/each}
			</ul>
		</div>

		<div class="flex flex-col overflow-auto h-full">
			<div class="flex gap-2">
				<p class="h-10 flex items-center text-sm px-1">Input Sketch (global)</p>
			</div>
			<div class="border border-black h-full rounded-2xl flat-shadow m-1 overflow-auto">
				<CodeMirror
					bind:value={$inputStore}
					lang={javascript()}
					theme={clouds}
					class="h-full"
					styles={{
						'&': {
							height: '100%',
							overflow: 'auto',
							borderRadius: '1rem',
							paddingTop: '0.5rem'
						}
					}}
				/>
			</div>
		</div>

		<div class="flex flex-col overflow-auto h-full">
			<div class="tabs tabs-boxed bg-inherit pl-5 h-10">
				<button
					class="tab"
					on:click={() => (isEditorActive = true)}
					class:tab-active={isEditorActive}>Output Sketch (instance | readonly)</button
				>
				<button
					class="tab flex gap-1"
					on:click={() => (isEditorActive = false)}
					class:tab-active={!isEditorActive}><PlayCircle strokeWidth={1} />Sketch Preview</button
				>
			</div>
			<div class="border border-black flex-grow rounded-2xl flat-shadow m-1 overflow-auto">
				{#if isEditorActive}
					<CodeMirror
						value={$outputStore}
						lang={javascript()}
						readonly
						basic={false}
						theme={clouds}
						class="h-full"
						styles={{
							'&': {
								height: '100%',
								overflow: 'auto',
								borderRadius: '1rem',
								padding: '0.5rem',
								background: '#FFFFFF77'
							}
						}}
					/>
				{:else}
					{#key $outputStore}
						<Preview />
					{/key}
				{/if}
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
