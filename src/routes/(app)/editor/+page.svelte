<script lang="ts">
	import type { Sketch } from 'p5-svelte';
	import Examples from './examples.svelte';
	import CodeEditor from './code-editor.svelte';
	import Preview from './preview.svelte';
	import { outputStore } from '$lib/stores/codeStore';
	import Warnings from './warnings.svelte';

	export let data;

	let sketch: Sketch;
</script>

<div class="grid flex-grow gap-4 overflow-auto lg:grid-cols-[auto_1fr_1fr]">
	<Examples examples={data.examples} />
	<CodeEditor />
	{#key $outputStore}
		<Preview />
	{/key}
</div>
<Warnings />
