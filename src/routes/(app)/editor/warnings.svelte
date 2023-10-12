<script lang="ts">
	import { AlertOctagon } from 'lucide-svelte';
	import { inputError } from '$lib/stores/codeStore';
</script>

<div class="text-xs">
	{#if $inputError}
		<span class="font-mono flex gap-2 items-center bg-red-500 text-white px-2 py-1">
			<AlertOctagon size={16} />
			{$inputError}
		</span>
	{/if}
</div>
