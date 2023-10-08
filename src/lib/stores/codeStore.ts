import { derived, writable } from "svelte/store";
import { convert } from "$lib/converter-babel";

export const instance = 'p';

export const inputStore = writable('');

export const outputStore = derived([inputStore], async ([$input]) => {
  return await convert($input, instance)
})