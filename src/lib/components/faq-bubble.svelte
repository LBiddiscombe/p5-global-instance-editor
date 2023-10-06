<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	export let question: string;
	export let answer: string;
</script>

<div in:fly={{ delay: 250, duration: 800, y: 300, opacity: 0, easing: quintOut }}>
	<div class="chat chat-start">
		<div class="chat-image avatar">
			<div class="w-10 rounded-full">
				<img src="https://i.pravatar.cc/100" alt="random avatar face" />
			</div>
		</div>
		<div class="chat-bubble bg-green-200 text-gray-600 w-64">
			{@html question}
		</div>
	</div>
	<div class="chat chat-end">
		<div class="chat-image avatar">
			<div class="w-10 rounded-full">
				<img src="/my-avatar.jpeg" alt="my random avatar face" />
			</div>
		</div>
		<div class="chat-bubble text-gray-500 bg-blue-100 w-64">
			{@html answer}
		</div>
	</div>
</div>
