<script lang="ts">
	import type { Sketch } from 'p5-svelte';
	import Examples from './examples.svelte';
	import CodeEditor from './code-editor.svelte';
	import Preview from './preview.svelte';
	import { outputStore } from '$lib/stores/codeStore';
	import Project from './project.svelte';

	export let data;

	let sketch: Sketch;
</script>

<div class="main-container grid flex-grow gap-4 overflow-auto lg:grid-cols-[auto_1fr_1fr]">
	<div class="project-container flex flex-col overflow-auto md:pt-3">
		<Project />
		<Examples examples={data.examples} />
	</div>
	<div class="code-container flex h-full flex-col overflow-auto">
		<CodeEditor />
	</div>

	{#key $outputStore}
		<div class="preview-container flex h-full flex-col overflow-auto">
			<Preview />
		</div>
	{/key}
</div>

<style>
	@media screen and (max-width: 1280px) {
		.main-container {
			grid-template-areas:
				'project code'
				'project preview';
			grid-template-columns: auto 1fr;
			grid-template-rows: 1fr 1fr;
		}

		.project-container {
			grid-area: project;
		}

		.code-container {
			grid-area: code;
		}

		.preview-container {
			grid-area: preview;
		}
	}

	@media screen and (max-width: 768px) {
		.main-container {
			grid-template-areas:
				'project'
				'code'
				'preview';
			grid-template-rows: 1fr 1fr 1fr;
			top: 8rem;
			padding-bottom: 4rem;
		}

		.project-container {
			grid-area: project;
			width: calc(100vw - 2rem);
		}

		.code-container {
			grid-area: code;
			width: calc(100vw - 2rem);
		}

		.preview-container {
			grid-area: preview;
			width: calc(100vw - 2rem);
		}
	}
</style>
