<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { javascript } from '@codemirror/lang-javascript';
	import { clouds } from 'thememirror';
	import { outputStore } from '$lib/stores/codeStore';

	export let project: Project;
	let isShowingOutput = false;
</script>

<div class="flex h-full flex-col overflow-auto">
	<div class="min-h-12 flex h-12 items-end gap-2">
		<div class="form-control">
			<label class="label flex cursor-pointer gap-1">
				<span class="label-text" class:font-bold={!isShowingOutput}>Input</span>
				<input type="checkbox" class="toggle" bind:checked={isShowingOutput} />
				<span class="label-text" class:font-bold={isShowingOutput}>Output</span>
			</label>
		</div>
		<div class="flex-grow"></div>
	</div>
	<div class="flat-shadow m-1 h-full overflow-auto rounded-2xl border border-black">
		{#if !isShowingOutput}
			<CodeMirror
				bind:value={project.files[project.editorIndex].content}
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
