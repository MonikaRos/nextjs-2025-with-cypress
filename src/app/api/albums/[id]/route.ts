import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
    const albumId = Number(params.id);

    const album = await getDb()
        .selectFrom("albums")
        .innerJoin("authors", "authors.id", "albums.author_id")
        .select([
            "albums.name",
            "albums.release_date",
            "authors.name as author_name",
            "authors.id as author_id"
        ])
        .where("albums.id", "=", albumId)
        .executeTakeFirst();

    return NextResponse.json(album) as unknown as typeof album;
}
