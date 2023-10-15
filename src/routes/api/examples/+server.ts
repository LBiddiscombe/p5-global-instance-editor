import { json } from '@sveltejs/kit';

async function getExamples() {

  const paths = import.meta.glob('/static/examples/**/*.js', { as: 'raw', eager: true });

  const folderGroups: { [name: string]: { name: string, path: string, content: string }[] } = {};

  for (const path in paths) {
    const parts = path.split('/');
    const folderName = parts[parts.length - 2];
    const fileName = parts[parts.length - 1];
    const content = paths[path];

    if (!folderGroups[folderName]) {
      folderGroups[folderName] = [];
    }

    folderGroups[folderName].push({
      name: fileName,
      path,
      content
    });
  }

  const examples = Object.entries(folderGroups).map(([name, files]) => {

    // make the sketch the first file in the list
    const foundIdx = files.findIndex(el => el.name === 'sketch.js')
    const foundExample = files.find(el => el.name === 'sketch.js')
    if (foundExample && foundIdx !== -1) {
      files.splice(foundIdx, 1)
      files.unshift(foundExample)
    }

    return {
      name,
      files
    };
  });


  return { examples };
}

export async function GET() {
  const { examples } = await getExamples();

  return json(examples);
}


/*
  const examples = Object.entries(paths).map(([name, code]) => {

    let localName = name.split('/').slice(3).join('/');
    localName = localName.split('.')[0];

    return {
      name: localName,
      input: code.toString()
    }
  })

  const firstExampleName = 'empty'
  const foundIdx = examples.findIndex(el => el.name === firstExampleName)
  const foundExample = examples.find(el => el.name === firstExampleName)
  if (foundExample && foundIdx !== -1) {
    examples.splice(foundIdx, 1)
    examples.unshift(foundExample)
  }

  return { examples };


*/

/* 

{
  folderGroups: {
    'collisions-part-2': [
      '/static/examples/collisions-part-2/ball.js',
      '/static/examples/collisions-part-2/grid.js',
      '/static/examples/collisions-part-2/sketch.js'
    ],
    empty: [ '/static/examples/empty/sketch.js' ],
    fish: [
      '/static/examples/fish/fish.js',
      '/static/examples/fish/sketch.js'
    ]
  }
}


[
  { 
    name: 'collisions-part-2',
    files: [
      { name: 'ball', path: '/static/examples/collisions-part-2/ball.js', content: '...' },
      
    ]
  }
]

*/