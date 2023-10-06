<script lang="ts">
	import FAQBubble from '$lib/components/faq-bubble.svelte';
	import Logo from '$lib/components/p5-logo.svelte';
</script>

<div class="hero min-h-screen relative">
	<div
		class="hero-content text-center text-base-300 bg-white flat-shadow border border-[#282825] rounded-2xl py-8 -translate-y-44"
	>
		<div class="max-w-xl flex flex-col gap-4">
			<h1 class="mb-5 text-5xl font-bold text-center flex flex-col items-center">
				<Logo size={92} />

				<p class="pt-8">global to instance editor</p>
			</h1>
			<p class="mb-8 text-gray-600">
				Online editor that compiles to copy paste-able <span
					class="font-mono border rounded mx-1 px-2 py-1 border-red-500">instance mode</span
				>
				code, <br /> while you enjoy the ease of writing sketches in global mode.
			</p>
			<a
				class="px-8 py-2 text-3xl border border-[#282825] rounded-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 shadow-[3px_3px_#282825] hover:shadow-[5px_5px_#282825] transition-all self-center"
				href="/editor">Get Started</a
			>
		</div>
	</div>

	<div class="absolute bottom-48 hidden lg:block w-full">
		<div class="flex w-full justify-center">
			<div class="w-full max-w-lg">
				<FAQBubble
					question={`Why would I use this instead of the far better <a href="https://editor.p5js.org" target="_blank" class="link font-semibold">official p5.js web editor</a>? or a real
				editor like VSCode?`}
					answer={`Good point, you probably wouldn't! Think of it as an experiment to help write instance mode
				sketches in the more enjoyable global mode... no more "p.everywhere"`}
				/>
			</div>
		</div>
	</div>
</div>
