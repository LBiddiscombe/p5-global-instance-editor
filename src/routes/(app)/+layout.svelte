<script>
	import '../../app.postcss';
	import Header from '$lib/components/header.svelte';
</script>

<svelte:head>
	<title>p5.js global to instance editor</title>
</svelte:head>

<div class="flex flex-col gap-4 p-4 text-base-content md:h-screen">
	<Header />
	<slot />
</div>
