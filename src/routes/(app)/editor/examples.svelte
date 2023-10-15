<script lang="ts">
	import { inputStore, selectedProject } from '$lib/stores/codeStore';

	export let examples: Project[];

	if (!$selectedProject) {
		handleClickExample(examples[0]);
	}

	function handleClickExample(example: Project) {
		const sketchFileIndex = example.files.findIndex((fn) => fn.name === 'sketch.js');
		if (sketchFileIndex < 0) return;
		selectedProject.set({ ...example, editorIndex: sketchFileIndex });
	}

	function handleClickFile(idx: number) {
		$selectedProject.editorIndex = idx;
		//inputStore.set(file.content);
	}
</script>

<div class="flex flex-col overflow-auto md:pt-2">
	<p class="h-10 flex items-center text-sm px-1">Examples</p>
	<div class="join join-vertical w-full">
		{#each examples as example}
			<div
				class="collapse join-item border-base-content !rounded-lg"
				class:border={example.name == $selectedProject.name}
			>
				<input
					type="radio"
					name="my-accordion-4"
					class="!min-h-0"
					checked={example.name == $selectedProject.name}
					on:change={() => handleClickExample(example)}
				/>
				<div class="collapse-title font-medium py-1 !min-h-0">
					{example.name}
				</div>
				<div class="collapse-content">
					{#each example.files as file, i}
						<button
							class="pl-2 block w-full text-left"
							class:font-medium={i == $selectedProject.editorIndex}
							class:bg-white={i == $selectedProject.editorIndex}
							on:click={() => handleClickFile(i)}>{file.name}</button
						>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
