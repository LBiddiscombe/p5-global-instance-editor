import { json } from '@sveltejs/kit';

async function getExamples() {
  const paths = import.meta.glob('/static/examples/**/*.js', { as: 'raw', eager: true });
  const folderGroups: { [name: string]: { name: string; content: string }[] } = {};

  for (const path in paths) {
    const parts = path.split('/');
    const folderName = parts[parts.length - 2];
    const fileName = parts[parts.length - 1];
    const content = paths[path];

    if (!folderGroups[folderName]) {
      folderGroups[folderName] = [];
    }

    folderGroups[folderName].push({ name: fileName, content });
  }

  const examples = Object.entries(folderGroups).map(([name, files]) => {
    const sketchIndex = files.findIndex((file) => file.name === 'sketch.js');
    const sketchFile = files.find((file) => file.name === 'sketch.js');
    if (sketchFile && sketchIndex !== -1) {
      files.splice(sketchIndex, 1);
      files.unshift(sketchFile);
    }

    return { name, persist: false, editorIndex: 0, files };
  });

  return { examples };
}

export async function GET() {
  const { examples } = await getExamples();

  return json(examples);
}