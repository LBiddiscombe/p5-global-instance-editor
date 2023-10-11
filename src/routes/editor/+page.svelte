<script lang="ts">
	import type { Sketch } from 'p5-svelte';
	import Header from './header.svelte';
	import Examples from './examples.svelte';
	import CodeEditor from './code-editor.svelte';
	import Preview from './preview.svelte';
	import { outputStore } from '$lib/stores/codeStore';
	import Warnings from './warnings.svelte';

	export let data;

	let sketch: Sketch;
</script>

<div class="flex flex-col h-screen p-4 gap-4 text-base-content">
	<Header />
	<div class="grid lg:grid-cols-[auto_1fr_1fr] gap-4 flex-grow overflow-auto">
		<Examples examples={data.examples} />
		<CodeEditor />
		{#key $outputStore}
			<Preview />
		{/key}
	</div>
	<Warnings />
</div>
