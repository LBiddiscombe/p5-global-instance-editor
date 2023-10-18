<script lang="ts">
	import FAQBubble from '$lib/components/faq-bubble.svelte';
	import Logo from '$lib/components/p5-logo.svelte';
	import { Superscript } from 'lucide-svelte';
</script>

<div class="container relative mx-auto flex h-screen flex-col overflow-hidden pt-[16vh]">
	<div
		class="flat-shadow mx-auto flex max-w-xl flex-col rounded-2xl border border-[#282825] bg-white px-4 py-8"
	>
		<div class="flex flex-col">
			<h1 class="flex flex-col items-center gap-2 text-center text-3xl font-bold">
				<div>
					<Logo size={80} />
				</div>

				<div class="my-4">
					global to instance <span class="crossout">editor</span><span class="align-super">*</span>
				</div>
			</h1>
			<p class="mb-8 text-center leading-7 text-gray-600">
				Online editor that compiles to copy paste-able <span
					class="mx-1 rounded border border-red-500 px-2 py-1 font-mono">instance mode</span
				>
				code, while you enjoy the ease of writing sketches in global mode.
			</p>
			<a
				class="self-center rounded-full border border-base-content bg-yellow-400 px-8 py-2 text-3xl shadow-[3px_3px_#282825] transition-all hover:bg-yellow-300 hover:shadow-[5px_5px_#282825]"
				href="/editor">Get Started</a
			>
		</div>
	</div>
	<p class="flex justify-center py-4 text-gray-500">
		<span class="pr-1 align-super">*</span>You can only edit a single set of global p5js code, so
		not really an editor 🫤
	</p>

	<div class="hidden w-full py-8 lg:block">
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
	.crossout {
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
