import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
    const albums = await getDb()
        .selectFrom("albums")
        .innerJoin("authors", "albums.author_id", "authors.id")
        .select([
            "albums.id",
            "albums.name",
            "albums.release_date",
            "authors.name as author_name",
            "authors.id as author_id"
        ])
        .execute();

    return NextResponse.json(albums) as unknown as typeof albums;
}
