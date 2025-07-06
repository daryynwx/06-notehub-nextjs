export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  tag: string; 

}

export interface NotesResponse {
  notes: Note[];
}
