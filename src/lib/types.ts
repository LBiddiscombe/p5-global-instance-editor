type ProjectFile = {
	name: string;
	content: string;
};

type Project = {
	name: string;
	files: ProjectFile[];
	editorIndex: number;
	persist: boolean;
};
