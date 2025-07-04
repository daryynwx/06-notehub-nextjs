import { NextResponse } from "next/server";

const notes = [
  { id: 1, title: "Note 1", content: "Content 1", createdAt: "2023-01-01" },
  { id: 2, title: "Note 2", content: "Content 2", createdAt: "2023-01-02" },
];

export async function GET() {
  return NextResponse.json(notes);
}

// можна додати POST, PUT, DELETE
