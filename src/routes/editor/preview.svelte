<script lang="ts">
	import P5, { type Sketch } from 'p5-svelte';
	import p5 from 'p5';
	import { PlayCircle, StopCircle, RotateCcw } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { instance, inputError } from '$lib/stores/codeStore';

	export let output: string;
	let sketch: Sketch | undefined;
	let isPlaying = true;
	let p5Instance: P5 | undefined;
	let p5Ref: HTMLDivElement | undefined;
	let sketchKey = Date.now();

	const handleError = (error: ErrorEvent) => {
		error.preventDefault();
		inputError.set(error.message);
	};

	onMount(() => {
		if (output) {
			try {
				sketch = new Function(instance, output) as Sketch;
			} catch (error) {
				if (error instanceof Error) {
					inputError.set(error.message);
					sketch = undefined;
				}
			}
		}

		window.addEventListener('error', handleError);

		return () => {
			window.removeEventListener('error', handleError);
			if (p5Ref && p5Instance) {
				p5Instance.remove();
				p5Instance = undefined;
				p5Ref.remove();
				p5Ref = undefined;
			}
		};
	});

	function togglePlaying() {
		isPlaying = !isPlaying;
		if (!isPlaying && p5Ref && p5Instance) {
			p5Instance.remove();
			p5Instance = undefined;
			p5Ref.remove();
			p5Ref = undefined;
		}
	}

	function restartSketch() {
		if (p5Ref && p5Instance) {
			p5Instance.remove();
			p5Instance = undefined;
			p5Ref.remove();
			p5Ref = undefined;
		}
		sketchKey = Date.now();
	}

	$: console.log(`p5 Version: ${p5.prototype.VERSION}`);

	function gotRef(e: CustomEvent) {
		p5Ref = e.detail;
	}

	function gotInstance(e: CustomEvent) {
		p5Instance = e.detail;
		const parentNode = p5Ref;
		const container = parentNode && (parentNode.parentNode as HTMLDivElement);
		if (!p5Instance || !parentNode || !container) return;

		const { width: maxWidth, height: maxHeight } = container.getBoundingClientRect();

		p5Instance.resizeCanvas(
			Math.min(maxWidth, p5Instance.width),
			Math.min(maxHeight, p5Instance.height)
		);
	}
</script>

<div class="h-full flex flex-col relative">
	<div class="absolute flex">
		<button
			on:click={togglePlaying}
			class="max-w-fit rounded-full bg-yellow-400 hover:bg-yellow-300 hover:shadow-[4px_4px_#282825] transition-all m-2 shadow-[2px_2px_#282825] border border-[#282825]"
		>
			{#if isPlaying}
				<StopCircle size={48} strokeWidth={1} absoluteStrokeWidth={true} />
			{:else}
				<PlayCircle size={48} strokeWidth={1} absoluteStrokeWidth={true} />
			{/if}
		</button>
		<button
			on:click={restartSketch}
			class="w-12 flex justify-center items-center aspect-square rounded-full bg-yellow-400 hover:bg-yellow-300 hover:shadow-[4px_4px_#282825] transition-all m-2 shadow-[2px_2px_#282825] border border-[#282825]"
		>
			<RotateCcw size={32} strokeWidth={1} absoluteStrokeWidth={true} />
		</button>
	</div>
	{#if sketch}
		{#key sketchKey}
			{#if isPlaying}
				<div class="py-2 flex justify-center items-center flex-grow overflow-hidden">
					<P5
						{sketch}
						parentDivStyle="border: 1px solid #000"
						debug={true}
						on:ref={gotRef}
						on:instance={gotInstance}
					/>
				</div>
			{/if}
		{/key}
	{/if}
</div>
