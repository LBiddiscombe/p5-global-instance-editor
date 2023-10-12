<script>
	import '../../app.postcss';
	import Header from '$lib/components/header.svelte';
</script>

<svelte:head>
	<title>p5.js global to instance editor</title>
</svelte:head>

<div class="flex flex-col h-screen p-4 gap-4 text-base-content">
	<Header />
	<slot />
</div>
