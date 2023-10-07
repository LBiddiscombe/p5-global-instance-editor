<script lang="ts">
	import FAQBubble from '$lib/components/faq-bubble.svelte';
	import Logo from '$lib/components/p5-logo.svelte';
</script>

<div class="container mx-auto h-screen relative py-8 flex flex-col overflow-hidden">
	<div
		class="px-4 py-8 max-w-xl mx-auto flex flex-col bg-white flat-shadow border border-[#282825] rounded-2xl"
	>
		<div class="flex flex-col">
			<h1 class="text-3xl font-bold text-center flex flex-col gap-2 items-center">
				<div>
					<Logo size={80} />
				</div>

				<div class="my-4">global to instance editor</div>
			</h1>
			<p class="mb-8 text-gray-600 text-center">
				Online editor that compiles to copy paste-able <span
					class="font-mono border rounded mx-1 px-2 py-1 border-red-500">instance mode</span
				>
				code, <br /> while you enjoy the ease of writing sketches in global mode.
			</p>
			<a
				class="px-8 py-2 text-3xl border border-base-content rounded-full bg-yellow-400 hover:bg-yellow-300 shadow-[3px_3px_#282825] hover:shadow-[5px_5px_#282825] transition-all self-center"
				href="/editor">Get Started</a
			>
		</div>
	</div>

	<div class="flex-grow"></div>

	<div class="hidden lg:block w-full mt-8">
		<div class="flex w-full justify-center">
			<div class="w-full max-w-2xl">
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
