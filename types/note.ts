export type Note = {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
};

export type NotesResponse = {
  results: Note[];
};
