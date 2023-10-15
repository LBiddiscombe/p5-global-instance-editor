type ProjectFile = {
  name: string;
  path: string;
  content: string;
}

type Project = {
  name: string;
  files: ProjectFile[];
  editorIndex: number;
}