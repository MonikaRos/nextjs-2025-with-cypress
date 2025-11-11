import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
    const authorId = Number(params.id);

    const albums = await getDb()
        .selectFrom("albums")
        .select(["id", "name", "release_date"])
        .where("author_id", "=", authorId)
        .execute();

    return NextResponse.json(albums) as unknown as typeof albums;
}
