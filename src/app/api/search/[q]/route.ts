import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type Params = { params: { q: string } };

export async function GET(_request: Request, { params }: Params) {
    const songs = await getDb()
        .selectFrom("songs")
        .innerJoin("albums", "songs.album_id", "albums.id")
        .innerJoin("authors", "albums.author_id", "authors.id")
        .select([
            "songs.id",
            "songs.name",
            "albums.name as album_name",
            "authors.name as author_name"
        ])
        .where("songs.name", "like", `%${params.q}%`)
        .execute();

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
        .where("albums.name", "like", `%${params.q}%`)
        .execute();

    const authors = await getDb()
        .selectFrom("authors")
        .selectAll()
        .where("authors.name", "like", `%${params.q}%`)
        .execute();

    const results = { songs, albums, authors };

    return NextResponse.json(results) as unknown as typeof results;
}
