import { json } from '@sveltejs/kit';

async function getExamples() {

  const paths = import.meta.glob('/static/examples/**/*.js', { as: 'raw', eager: true });

  const examples = Object.entries(paths).map(([name, code]) => {

    let localName = name.split('/').slice(3).join('/');
    localName = localName.split('.')[0];

    return {
      name: localName,
      input: code.toString()
    }
  })


  return { examples };
}

export async function GET() {
  const { examples } = await getExamples();

  return json(examples);
}
