<script lang="ts">
	import P5, { type Sketch } from 'p5-svelte';
	import p5 from 'p5';
	import { PlayCircle, StopCircle, RotateCcw, Clapperboard, PauseCircle } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { instance, errorMessage, outputStore, isPreviewStopped } from '$lib/stores/codeStore';

	let sketch: Sketch | undefined;
	let p5Instance: P5 | undefined;
	let p5Ref: HTMLDivElement | undefined;
	let sketchKey = Date.now();
	let frameRate = 0;

	onMount(() => {
		try {
			sketch = new Function(instance, $outputStore ?? '') as Sketch;
		} catch (error) {
			if (error instanceof Error) {
				errorMessage.set(`Sketch Wrap Error: ${error.message}`);
				sketch = undefined;
			}
		}

		const frInterval = setInterval(() => {
			frameRate = p5Instance?._frameRate;
		}, 1000);

		window.addEventListener('error', handleError);

		return () => {
			window.removeEventListener('error', handleError);
			clearInterval(frInterval);
			cleanUpSketch();
		};
	});

	function cleanUpSketch() {
		if (p5Ref && p5Instance) {
			p5Instance.remove();
			p5Instance = undefined;
			p5Ref.remove();
			p5Ref = undefined;
		}
	}

	const handleError = (error: ErrorEvent) => {
		error.preventDefault();
		errorMessage.set(`Runtime Error: ${error.message}`);
	};

	function togglePlaying() {
		isPreviewStopped.set(!$isPreviewStopped);
		cleanUpSketch();
	}

	function restartSketch() {
		cleanUpSketch();
		sketchKey = Date.now();
	}

	function pauseSketch() {
		if (p5Instance) {
			if (p5Instance.isLooping()) p5Instance.noLoop();
			else p5Instance.loop();
		}
	}

	$: console.log(`p5 Version: ${p5.prototype.VERSION}`);

	function handleRef(e: CustomEvent) {
		p5Ref = e.detail;
	}

	function handleInstance(e: CustomEvent) {
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

<div class="min-h-12 flex w-full items-center gap-2">
	<button
		on:click={togglePlaying}
		class="flex aspect-square items-center justify-center rounded-full border border-[#282825] bg-yellow-400 shadow-[2px_2px_#282825] transition-all hover:bg-yellow-300 hover:shadow-[4px_4px_#282825]"
	>
		{#if $isPreviewStopped}
			<PlayCircle size={40} strokeWidth={1} absoluteStrokeWidth={true} />
		{:else}
			<StopCircle size={40} strokeWidth={1} absoluteStrokeWidth={true} />
		{/if}
	</button>
	{#if !$isPreviewStopped}
		<button
			on:click={restartSketch}
			class="flex aspect-square items-center justify-center rounded-full border border-[#282825] bg-yellow-400 p-1 shadow-[2px_2px_#282825] transition-all hover:bg-yellow-300 hover:shadow-[4px_4px_#282825]"
		>
			<RotateCcw size={32} strokeWidth={1} absoluteStrokeWidth={true} />
		</button>
		<button
			on:click={pauseSketch}
			class="flex aspect-square items-center justify-center rounded-full border border-[#282825] bg-yellow-400 shadow-[2px_2px_#282825] transition-all hover:bg-yellow-300 hover:shadow-[4px_4px_#282825]"
		>
			<PauseCircle size={40} strokeWidth={1} absoluteStrokeWidth={true} />
		</button>
		<div class="flex-grow"></div>
		<span class="mr-4 self-end justify-self-end rounded-lg px-2 py-1 font-mono">
			FPS: {Math.floor(frameRate ?? 0)}
		</span>
	{/if}
</div>
<div class="flat-shadow m-1 flex-grow overflow-auto rounded-2xl border border-black">
	<div class="flex h-full flex-col">
		{#key sketchKey}
			<div class="flex flex-grow flex-col items-center justify-center overflow-hidden py-2">
				{#if !$isPreviewStopped}
					<P5
						{sketch}
						parentDivStyle="border: 1px solid #000"
						debug={true}
						on:ref={handleRef}
						on:instance={handleInstance}
					/>
				{:else}
					<Clapperboard size={128} strokeWidth={1} absoluteStrokeWidth={true} />
					<p>Sketch will play here</p>
				{/if}
			</div>
		{/key}
	</div>
</div>
