<script lang="ts">
	import Logo from '$lib/components/p5-logo.svelte';
	import { PlayCircle, Home, Info, AlertOctagon } from 'lucide-svelte';
</script>

<div class="flex justify-between items-center">
	<a
		href="/"
		class="rounded-full bg-yellow-400 hover:bg-yellow-300 hover:shadow-[4px_4px_#282825] transition-all p-2 shadow-[2px_2px_#282825] border border-[#282825]"
	>
		<Home size={32} strokeWidth={1} absoluteStrokeWidth={true} />
	</a>
	<h1 class="p-4 text-3xl font-bold">
		<Logo /> global to instance editor
	</h1>
	<div class="invisible">
		<Info />
	</div>
</div>
