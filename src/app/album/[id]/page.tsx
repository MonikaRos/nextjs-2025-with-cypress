"use client";

import Link from "next/link";
import { use } from "react";
import { useApi } from "@/lib/utils/useApi";
import { GET as GETAlbum } from "@/app/api/albums/[id]/route";
import { GET as GETSongs } from "@/app/api/albums/[id]/songs/route";

function formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes}` + ":" + `${seconds}`.padStart(2, "0");
}

type Album = Awaited<ReturnType<typeof GETAlbum>>;
type Songs = Awaited<ReturnType<typeof GETSongs>>;

export default function AlbumDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const { data: album } = useApi<Album>(`/api/albums/${id}`);
    const { data: songs } = useApi<Songs>(`/api/albums/${id}/songs`);

    if (!album) {
        return <div>Album not found</div>;
    }

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div>
                    {album.name} by{" "}
                    <Link href={`/author/${album.author_id}`}>{album.author_name}</Link>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs?.map((song, i) => (
                                <tr key={song.id}>
                                    <td>{i + 1}</td>
                                    <td>{song.name}</td>
                                    <td>{formatDuration(song.duration)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
