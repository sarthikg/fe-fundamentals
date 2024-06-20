import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") as string;

  const params = new URLSearchParams();
  params.append("title", query);

  const response = await fetch(`https://openlibrary.org/search.json?${params}`);
  const result = await response.json();
  return NextResponse.json(result.docs.map((doc: any) => doc.title));
}
