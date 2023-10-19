<script>
	import '../../app.postcss';
	import Header from '$lib/components/header.svelte';
</script>

<svelte:head>
	<title>p5.js global to instance editor</title>
</svelte:head>

<div class="flex flex-col gap-2 px-4 py-2 text-base-content md:h-screen">
	<Header />
	<slot />
</div>
