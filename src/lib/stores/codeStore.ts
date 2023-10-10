import { derived, writable } from "svelte/store"
import { storage } from "svelte-legos";;
import { convert } from "$lib/converter-babel";

let previousOutput: string;

export const instance = '_p5';
export const inputStore = storage(writable(''), 'input');
export const inputError = writable('');
export const outputStore = derived([inputStore], ([$input]) => {
  let output;
  try {
    output = convert($input, instance);
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

