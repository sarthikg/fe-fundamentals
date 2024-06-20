import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const prevIndex = searchParams.get("prevEndIndex");
  let prevEndIndex = parseInt(prevIndex as string);

  const currItems: number[] = new Array(100).fill(0).map(() => ++prevEndIndex);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(NextResponse.json(currItems));
    }, 500);
  });
}
