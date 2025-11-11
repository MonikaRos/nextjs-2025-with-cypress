import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
    const albumId = Number(params.id);

    const songs = await getDb()
        .selectFrom("songs")
        .selectAll()
        .where("album_id", "=", albumId)
        .execute();

    return NextResponse.json(songs) as unknown as typeof songs;
}
