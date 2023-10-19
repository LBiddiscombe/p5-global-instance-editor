<script lang="ts">
	import { AlertOctagon } from 'lucide-svelte';
	import { errorMessage } from '$lib/stores/codeStore';
</script>

{#if $errorMessage}
	<div class="fixed bottom-0 left-0 text-xs md:static md:py-2">
		<span class="flex items-center gap-2 bg-red-500 px-2 py-1 font-mono text-white">
			<AlertOctagon size={16} />
			{$errorMessage}
		</span>
	</div>
{/if}
