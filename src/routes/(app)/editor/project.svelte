<script lang="ts">
	import { FileEdit, FileX2, FilePlus2, MoreHorizontal } from 'lucide-svelte';
	import { myProject, activeProject, persistProject } from '$lib/stores/codeStore';
	import { onMount } from 'svelte';

	let newName = '';

	onMount(() => {
		activeProject.set($myProject);
	});

	function renameable(node: HTMLElement, idx: number) {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Enter') {
				event.preventDefault();
				if (node.textContent === '') {
					return;
				}
				$myProject.files[idx].name = node.textContent ?? '';
				menuElement?.removeAttribute('open');
				persistProject($myProject);
			}
			if (event.key === 'Escape') {
				event.preventDefault();
				node.textContent = $myProject.files[idx].name;
				menuElement?.removeAttribute('open');
			}
		}

		const menuElement = node.closest('details');
		node.contentEditable = 'true';
		document.addEventListener('keydown', handleKeyDown);

		return {
			destroy() {
				document.removeEventListener('keydown', handleKeyDown);
			}
		};
	}

	function handleClickFile(idx: number) {
		$myProject.editorIndex = idx;
		activeProject.set($myProject);
	}

	function addFile() {
		const newFile = { name: newName || 'new-file.js', content: '' };
		$myProject.files = [...$myProject.files, newFile];
		handleClickFile($myProject.files.length - 1);
		persistProject($myProject);
		newName = '';
	}

	function deleteFile(idx: number) {
		if ($myProject.editorIndex !== null) {
			$myProject.files.splice(idx, 1);
			handleClickFile(idx - 1);
		}
		persistProject($myProject);
	}

	function handleNewFileKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			if (newName === '') {
				return;
			}
			event.preventDefault();
			addFile();
		}
		if (event.key === 'Escape') {
			event.preventDefault();
			newName = '';
		}
	}
</script>

<p class="py-2">Project Files</p>
<div class="flex h-80 flex-grow flex-col rounded-2xl border border-base-content bg-base-200 p-2">
	{#if $myProject}
		<form on:submit|preventDefault={addFile} class="flex items-center gap-2 p-1">
			<input
				type="text"
				bind:value={newName}
				on:keydown={handleNewFileKeyDown}
				placeholder="New file name"
				class="placeholder: w-full rounded-lg border border-base-content px-2 py-1 text-sm"
				required
			/>
			<button type="submit">
				<FilePlus2 strokeWidth={1} />
			</button>
		</form>
		<ul class="flex flex-col gap-1">
			{#each $myProject.files as file, idx}
				<li class="group relative flex gap-1">
					<button
						class="block w-full px-2 py-1 text-left"
						class:font-medium={idx == $myProject.editorIndex}
						class:bg-white={idx == $myProject.editorIndex}
						on:click={() => handleClickFile(idx)}
					>
						{file.name}
					</button>
					{#if idx > 0}
						<div class="group absolute right-0 top-0">
							<details class="dropdown dropdown-end invisible mb-32 group-hover:visible">
								<summary class="p-1 hover:bg-gray-100"><MoreHorizontal strokeWidth={1} /></summary>
								<ul
									class="menu dropdown-content rounded-box z-[1] w-52 border bg-base-100 py-2 shadow-md"
								>
									<li>
										<div class="inlineblock !pl-1">
											<FileEdit strokeWidth={1} /><span
												use:renameable={idx}
												class="cursor-text border bg-white p-1">{file.name}</span
											>
										</div>
									</li>
									<li>
										<button class="!pl-1" on:click={() => deleteFile(idx)}>
											<FileX2 strokeWidth={1} /> Delete {file.name}
										</button>
									</li>
								</ul>
							</details>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
		<div class="flex-grow"></div>
		<p class="w-64 rounded-lg bg-yellow-300 p-2 text-center text-sm">
			Under Construction - Just the one personal sketch project synced to local storage for now,
			plus the examples below
		</p>
	{/if}
</div>
