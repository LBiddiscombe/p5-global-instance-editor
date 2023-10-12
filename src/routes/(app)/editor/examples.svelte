<script lang="ts">
	import { inputStore, selectedExample } from '$lib/stores/codeStore';

	export let examples: Example[];

	if ($selectedExample === '') {
		handleClickExample(examples[0]);
	}

	function handleClickExample(example: Example) {
		inputStore.set(example.input);
		selectedExample.set(example.name);
	}
</script>

<div class="flex flex-col overflow-auto md:pt-2">
	<p class="h-10 flex items-center text-sm px-1">Examples</p>
	<ul class="flex flex-col overflow-auto h-full mt-4 gap-2">
		{#each examples as example}
			<li class="self-start">
				<button
					class="btn btn-xs rounded"
					class:btn-primary={example.name === $selectedExample}
					on:click={() => handleClickExample(example)}>{example.name}</button
				>
			</li>
		{/each}
	</ul>
</div>
