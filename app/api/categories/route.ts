import { NextResponse } from "next/server";
import { getCategoriesWithCount } from "@/lib/content";

export async function GET() {
  return NextResponse.json(await getCategoriesWithCount(), { headers: { "Cache-Control": "public, s-maxage=300" } });
}
