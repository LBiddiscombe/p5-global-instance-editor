<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '$lib/components/p5-logo.svelte';
	import { Home, Settings2, FileCode } from 'lucide-svelte';

	console.log($page);
</script>

<div class="flex justify-between items-center">
	{#if $page.url.pathname === '/editor'}
		<a
			href="/"
			title="home"
			class="rounded-full bg-yellow-400 hover:bg-yellow-300 hover:shadow-[4px_4px_#282825] transition-all p-2 shadow-[2px_2px_#282825] border border-[#282825]"
		>
			<Home size={32} strokeWidth={1} absoluteStrokeWidth={true} />
		</a>
	{:else}
		<a
			href="/editor"
			title="editor"
			class="rounded-full bg-yellow-400 hover:bg-yellow-300 hover:shadow-[4px_4px_#282825] transition-all p-2 shadow-[2px_2px_#282825] border border-[#282825]"
		>
			<FileCode size={32} strokeWidth={1} absoluteStrokeWidth={true} />
		</a>
	{/if}

	<h1 class="p-4 text-3xl font-bold">
		<Logo /> global to instance editor
	</h1>

	<div class="flex">
		<a
			href="/settings"
			title="settings"
			class="rounded-full bg-yellow-400 hover:bg-yellow-300 hover:shadow-[4px_4px_#282825] transition-all p-2 shadow-[2px_2px_#282825] border border-[#282825]"
			class:hidden={$page.url.pathname === '/settings'}
		>
			<Settings2 size={32} strokeWidth={1} absoluteStrokeWidth={true} />
		</a>
	</div>
</div>
