<script lang="ts">
	import P5, { type Sketch } from 'p5-svelte';
	import p5 from 'p5';
	import { PlayCircle, StopCircle } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { instance, inputError } from '$lib/stores/codeStore';

	export let output: string;
	let sketch: Sketch;
	let isPlaying = true;
	let p5Instance: P5;
	let p5Ref: HTMLDivElement;

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
				}
			}
		}

		window.addEventListener('error', handleError);

		return () => {
			window.removeEventListener('error', handleError);
		};
	});

	$: console.log(`p5 Version: ${p5.prototype.VERSION}`);

	function gotRef(e: CustomEvent) {
		p5Ref = e.detail;
	}

	function gotInstance(e: CustomEvent) {
		p5Instance = e.detail;
		const parentNode = p5Ref;
		const container = parentNode.parentNode as HTMLDivElement;
		if (!p5Instance || !parentNode || !container) return;

		const { width: maxWidth, height: maxHeight } = container.getBoundingClientRect();

		p5Instance.width = Math.min(maxWidth, p5Instance.width);
		p5Instance.height = Math.min(maxHeight, p5Instance.height);
		p5Instance._start();
	}
</script>

<div class="h-full flex flex-col relative">
	<button
		on:click={() => (isPlaying = !isPlaying)}
		class="absolute max-w-fit rounded-full bg-yellow-400 hover:bg-yellow-300 hover:shadow-[4px_4px_#282825] transition-all m-2 shadow-[2px_2px_#282825] border border-[#282825]"
	>
		{#if isPlaying}
			<StopCircle size={48} strokeWidth={1} absoluteStrokeWidth={true} />
		{:else}
			<PlayCircle size={48} strokeWidth={1} absoluteStrokeWidth={true} />
		{/if}
	</button>
	{#if sketch}
		{#key sketch}
			{#if isPlaying}
				<div class="py-2 flex justify-center items-center flex-grow overflow-hidden">
					<P5
						{sketch}
						parentDivStyle="border: 1px solid #000"
						debug={false}
						on:ref={gotRef}
						on:instance={gotInstance}
					/>
				</div>
			{/if}
		{/key}
	{/if}
</div>
