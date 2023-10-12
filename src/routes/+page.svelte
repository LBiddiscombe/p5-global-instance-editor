<script lang="ts">
	import FAQBubble from '$lib/components/faq-bubble.svelte';
	import Logo from '$lib/components/p5-logo.svelte';
	import { Superscript } from 'lucide-svelte';
</script>

<div class="container mx-auto h-screen relative pt-[16vh] flex flex-col overflow-hidden">
	<div
		class="px-4 py-8 max-w-xl mx-auto flex flex-col bg-white flat-shadow border border-[#282825] rounded-2xl"
	>
		<div class="flex flex-col">
			<h1 class="text-3xl font-bold text-center flex flex-col gap-2 items-center">
				<div>
					<Logo size={80} />
				</div>

				<div class="my-4">
					global to instance <span class="striked">editor</span><span class="align-super">*</span>
				</div>
			</h1>
			<p class="mb-8 text-gray-600 text-center leading-7">
				Online editor that compiles to copy paste-able <span
					class="font-mono border rounded mx-1 px-2 py-1 border-red-500">instance mode</span
				>
				code, while you enjoy the ease of writing sketches in global mode.
			</p>
			<a
				class="px-8 py-2 text-3xl border border-base-content rounded-full bg-yellow-400 hover:bg-yellow-300 shadow-[3px_3px_#282825] hover:shadow-[5px_5px_#282825] transition-all self-center"
				href="/editor">Get Started</a
			>
		</div>
	</div>
	<p class="flex justify-center py-4 text-gray-500">
		<span class="align-super pr-1">*</span>You can only edit a single file of global p5js code, so
		not really an editor 🫤
	</p>

	<div class="hidden lg:block w-full py-8">
		<div class="flex w-full justify-center">
			<div class="w-full max-w-2xl">
				<FAQBubble
					question={`Why would I use this instead of the far better <a href="https://editor.p5js.org" target="_blank" class="link font-semibold">official p5.js web editor</a>? or a real
				editor like VSCode?`}
					answer={`That's fair, you probably wouldn't. It's an experiment to help write me instance mode
				sketches in the more relaxed global mode... no more "p.everywhere"`}
				/>
			</div>
		</div>
	</div>
</div>

<style>
	.striked {
		background: linear-gradient(
				to left top,
				transparent 47.75%,
				rgb(239 68 68) 47.5%,
				rgb(239 68 68) 53.5%,
				transparent 52.25%
			),
			linear-gradient(
				to right top,
				transparent 47.75%,
				rgb(239 68 68) 47.5%,
				rgb(239 68 68) 53.5%,
				transparent 52.25%
			);
	}
</style>
