import { derived, writable, type Writable } from 'svelte/store';
import { storage } from 'svelte-legos';
import { convert } from '$lib/converter-babel';

let previousOutput: string;

export const instance = '_p5';
export const selectedProject: Writable<Project> = storage(writable(), 'selectedProject');
export const errorMessage = writable('');
export const outputStore = derived([selectedProject], ([$selectedProject]) => {
	let output;
	try {
		const allFiles = $selectedProject.files.map((file) => file.content).join('\n');
		output = convert(allFiles, instance);
		previousOutput = output ?? '';
		errorMessage.set('');
	} catch (error) {
		if (error instanceof Error) {
			output = previousOutput;
			errorMessage.set(error.message);
		}
	}
	return output;
});
export const isPreviewStopped = writable(false);
