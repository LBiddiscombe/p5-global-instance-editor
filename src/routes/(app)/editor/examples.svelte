<script lang="ts">
	import { selectedProject } from '$lib/stores/codeStore';

	export let examples: Project[];

	if (!$selectedProject) {
		handleClickExample(examples[0]);
	}

	function handleClickExample(example: Project) {
		selectedProject.set({ ...example, editorIndex: 0 });
	}

	function handleClickFile(idx: number) {
		$selectedProject.editorIndex = idx;
	}
</script>

<div class="flex flex-col overflow-auto md:pt-3">
	<p class="flex h-10 items-center px-1 text-sm">Examples</p>
	<div class="join join-vertical w-full">
		{#each examples as example}
			<div
				class="collapse join-item !rounded-lg border-base-content"
				class:border={example.name == $selectedProject.name}
			>
				<input
					type="radio"
					name="my-accordion-4"
					class="!min-h-0"
					checked={example.name == $selectedProject.name}
					on:change={() => handleClickExample(example)}
				/>
				<div class="collapse-title !min-h-0 py-1 font-medium">
					{example.name}
				</div>
				<div class="collapse-content">
					{#each example.files as file, i}
						<button
							class="block w-full pl-2 text-left"
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
