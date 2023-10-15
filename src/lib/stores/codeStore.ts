import { derived, writable, type Writable } from "svelte/store"
import { storage } from "svelte-legos";;
import { convert } from "$lib/converter-babel";

let previousOutput: string;

export const instance = '_p5';
export const selectedProject: Writable<Project> = storage(writable(), 'selectedProject');
export const inputStore = storage(writable(''), 'input');
export const inputError = writable('');
export const outputStore = derived([inputStore, selectedProject], ([$input, $selectedProject]) => {
  let output;
  try {
    const allFiles = $selectedProject.files.map(file => file.content).join('\n');
    output = convert(allFiles, instance);
    previousOutput = output ?? '';
    inputError.set('');
  } catch (error) {
    if (error instanceof Error) {
      output = previousOutput;
      inputError.set(error.message);
    }
  }
  return output;
})
export const isPreviewStopped = writable(false);