import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
    const authorId = Number(params.id);

    const author = await getDb()
        .selectFrom("authors")
        .selectAll()
        .where("id", "=", authorId)
        .executeTakeFirst();

    return NextResponse.json(author) as unknown as typeof author;
}
