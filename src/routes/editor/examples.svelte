<script lang="ts">
	import { inputStore } from '$lib/stores/codeStore';

	export let examples: Example[];

	let selectedExample = '';

	function handleClickExample(example: Example) {
		inputStore.set(example.input);
		selectedExample = example.name;
	}
</script>

<div class="flex flex-col overflow-auto">
	<p class="h-10 flex items-center text-sm px-1">Examples</p>
	<ul class="flex flex-col overflow-auto h-full mt-4 gap-2">
		{#each examples as example}
			<li class="self-start">
				<button
					class="btn btn-xs rounded"
					class:btn-primary={example.name === selectedExample}
					on:click={() => handleClickExample(example)}>{example.name}</button
				>
			</li>
		{/each}
	</ul>
</div>
