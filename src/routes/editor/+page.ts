export async function load({ fetch, url }) {
  const examplesResponse = await fetch(`api/examples`);
  const examples = await examplesResponse.json();



  return { examples };
}