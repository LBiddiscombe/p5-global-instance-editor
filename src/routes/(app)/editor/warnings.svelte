<script lang="ts">
	import { AlertOctagon } from 'lucide-svelte';
	import { errorMessage } from '$lib/stores/codeStore';
</script>

<div class="text-xs">
	{#if $errorMessage}
		<span class="font-mono flex gap-2 items-center bg-red-500 text-white px-2 py-1">
			<AlertOctagon size={16} />
			{$errorMessage}
		</span>
	{/if}
</div>
