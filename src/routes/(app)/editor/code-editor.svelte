<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { javascript } from '@codemirror/lang-javascript';
	import { clouds } from 'thememirror';
	import { inputStore, outputStore, selectedProject } from '$lib/stores/codeStore';

	let isShowingOutput = false;
</script>

<div class="flex flex-col overflow-auto h-full">
	<div class="flex gap-2 h-12 items-end min-h-12">
		<div class="form-control">
			<label class="label cursor-pointer flex gap-1">
				<span class="label-text" class:font-bold={!isShowingOutput}>Input</span>
				<input type="checkbox" class="toggle" bind:checked={isShowingOutput} />
				<span class="label-text" class:font-bold={isShowingOutput}>Output</span>
			</label>
		</div>
		<div class="flex-grow"></div>
	</div>
	<div class="border border-black h-full rounded-2xl flat-shadow m-1 overflow-auto">
		{#if !isShowingOutput}
			<CodeMirror
				bind:value={$selectedProject.files[$selectedProject.editorIndex].content}
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
		{:else}
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
		{/if}
	</div>
</div>
