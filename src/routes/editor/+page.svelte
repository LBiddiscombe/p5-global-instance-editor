<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { javascript } from '@codemirror/lang-javascript';
	import { clouds } from 'thememirror';
	import { convert } from '$lib/converter-babel';
	import { starterCode } from './starter-code';
	import type { Sketch } from 'p5-svelte';
	import Logo from '$lib/components/p5-logo.svelte';
	import { PlayCircle, Home, Info } from 'lucide-svelte';
	import Preview from './preview.svelte';

	const instance = 'p';
	let isEditorActive = true;
	let input = starterCode;
	let sketch: Sketch;
	let output: string | undefined;

	async function checkConverter() {
		const input = 'function setup() {};';
		const output = 'p.setup = function () {};';
		const result = await convert(input, instance);

		console.log({ input }, { output }, { result });
	}

	$: convert(input, instance).then((result) => {
		console.log({ result });
		return (output = result ?? '');
	});
	$: {
		if (output) {
			checkConverter();
			isEditorActive = true;
			try {
				sketch = new Function(instance, output) as Sketch;
			} catch (error) {
				if (error instanceof Error) {
					output = `// Error in wrapping as instance sketch: ${error.message}`;
				}
			}
		}
	}
</script>

<div class="flex flex-col h-screen p-4 gap-4 text-base-300">
	<div class="flex justify-between items-center">
		<a
			href="/"
			class="rounded-full bg-yellow-400 hover:bg-yellow-300 hover:shadow-[4px_4px_#282825] transition-all p-2 shadow-[2px_2px_#282825] border border-[#282825]"
		>
			<Home size={32} strokeWidth={1} absoluteStrokeWidth={true} />
		</a>
		<h1 class="p-4 text-3xl font-bold h-16">
			<Logo /> global to instance editor
		</h1>
		<div class="invisible">
			<Info />
		</div>
	</div>

	<div class="grid lg:grid-cols-2 gap-4 flex-grow overflow-auto">
		<div class="flex flex-col overflow-auto h-full">
			<p class="h-10 flex items-center text-sm px-1">Input Sketch (global)</p>
			<div class="border border-black h-full rounded-2xl flat-shadow m-1 overflow-auto">
				<CodeMirror
					bind:value={input}
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
			<div class="tabs bg-inherit pl-10 mt-[6.5px] translate-y-[5px]">
				<button
					class="tab tab-lifted"
					on:click={() => (isEditorActive = true)}
					class:tab-active={isEditorActive}
					class:text-white={isEditorActive}>Output Sketch (instance | readonly)</button
				>
				<button
					class="tab tab-lifted flex gap-2"
					on:click={() => (isEditorActive = false)}
					class:tab-active={!isEditorActive}
					class:text-white={!isEditorActive}><PlayCircle />Sketch Preview</button
				>
			</div>
			<div class="border border-black flex-grow rounded-2xl flat-shadow m-1 overflow-auto">
				{#if isEditorActive}
					<CodeMirror
						bind:value={output}
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
				{:else if output}
					<Preview {sketch} />
				{/if}
			</div>
		</div>
	</div>
	<div class="p-4 h-16 flex justify-center" />
</div>
