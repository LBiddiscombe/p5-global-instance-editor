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
	<div class="flex flex-col overflow-auto md:pt-3">
		<p class="py-2">Project Files</p>
		<div class="h-80 flex-grow rounded-2xl border border-base-content bg-base-200 p-2">
			<p class="text-center text-sm">placeholder</p>
		</div>
		<Examples examples={data.examples} />
	</div>
	<CodeEditor />
	{#key $outputStore}
		<Preview />
	{/key}
</div>
<Warnings />
