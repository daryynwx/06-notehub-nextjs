import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const notes = await fetchNotes();

  return <NotesClient initialNotes={notes} />;
}
