"use client";

import Link from "next/link";
import { useApi } from "@/lib/utils/useApi";
import { GET as GETAuthor } from "@/app/api/authors/[id]/route";
import { GET as GETAlbums } from "@/app/api/authors/[id]/albums/route";
import { use } from "react";

type Author = Awaited<ReturnType<typeof GETAuthor>>;
type Albums = Awaited<ReturnType<typeof GETAlbums>>;

export default function AuthorDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const { data: author } = useApi<Author>(`/api/authors/${id}`);
    const { data: albums } = useApi<Albums>(`/api/authors/${id}/albums`);

    if (!author) {
        return <div>Author not found</div>;
    }

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div>Name: {author.name}</div>
                <div>Bio: {author.bio}</div>

                <div>
                    Albums:
                    <ul>
                        {albums?.map((album) => (
                            <li key={album.id}>
                                <Link href={`/album/${album.id}`}>{album.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}
