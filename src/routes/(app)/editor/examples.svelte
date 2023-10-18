<script lang="ts">
	import { activeProject } from '$lib/stores/codeStore';

	export let examples: Project[];

	if (!$activeProject) {
		handleClickExample(examples[0]);
	}

	function handleClickExample(example: Project) {
		activeProject.set({ ...example, editorIndex: 0 });
	}

	function handleClickFile(idx: number) {
		$activeProject.editorIndex = idx;
	}
</script>

<div class="collapse collapse-arrow overflow-auto">
	<input type="checkbox" checked />
	<div class="collapse-title font-medium">Examples</div>
	<div class="collapse-content">
		<div class="join join-vertical w-full">
			{#each examples as example}
				<div
					class="collapse join-item !rounded-lg border-base-content"
					class:border={example.name == $activeProject.name}
				>
					<input
						type="radio"
						name="my-accordion-4"
						class="!min-h-0"
						checked={example.name == $activeProject.name}
						on:change={() => handleClickExample(example)}
					/>
					<div class="collapse-title !min-h-0 py-1 font-medium">
						{example.name}
					</div>
					<div class="collapse-content">
						{#each example.files as file, i}
							<button
								class="block w-full pl-2 text-left"
								class:font-medium={i == $activeProject.editorIndex}
								class:bg-white={i == $activeProject.editorIndex}
								on:click={() => handleClickFile(i)}>{file.name}</button
							>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
