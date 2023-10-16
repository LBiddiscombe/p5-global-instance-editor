<script lang="ts">
	import { AlertOctagon } from 'lucide-svelte';
	import { errorMessage } from '$lib/stores/codeStore';
</script>

<div class="text-xs">
	{#if $errorMessage}
		<span class="flex items-center gap-2 bg-red-500 px-2 py-1 font-mono text-white">
			<AlertOctagon size={16} />
			{$errorMessage}
		</span>
	{/if}
</div>
