<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { javascript } from '@codemirror/lang-javascript';
	import { clouds } from 'thememirror';
	import { outputStore, activeProject, persistProject } from '$lib/stores/codeStore';

	let isShowingOutput = false;

	function handleChange(event: CustomEvent) {
		// check project is to be persisted and save it here...
		if ($activeProject.persist) {
			persistProject($activeProject);
		}
	}
</script>

<div class="flex h-full flex-col overflow-auto">
	<div class="min-h-12 flex h-12 items-end gap-2">
		<span class="flex h-10 items-center pl-2 text-sm">
			{$activeProject.name} | {$activeProject.files[$activeProject.editorIndex].name}
		</span>
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
				bind:value={$activeProject.files[$activeProject.editorIndex].content}
				on:change={handleChange}
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
