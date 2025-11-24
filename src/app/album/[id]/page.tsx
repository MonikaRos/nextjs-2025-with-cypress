"use client";

import Link from "next/link";
import { use } from "react";
import { useApi } from "@/lib/utils/useApi";
import { GET as GETAlbum } from "@/app/api/albums/[id]/route";
import { GET as GETSongs } from "@/app/api/albums/[id]/songs/route";

function formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

type Album = Awaited<ReturnType<typeof GETAlbum>>;
type Songs = Awaited<ReturnType<typeof GETSongs>>;

export default function AlbumDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const {
        data: album,
        isLoading: albumLoading,
        error: albumError
    } = useApi<Album>(`/api/albums/${id}`);

    const {
        data: songs,
        isLoading: songsLoading,
        
    } = useApi<Songs>(`/api/albums/${id}/songs`);

 
    if (albumLoading || songsLoading) {
        return (
            <div data-cy="loading" className="text-center mt-10">
                Loading...
            </div>
        );
    }

  
    if (albumError || !album) {
        return (
            <div className="text-center mt-10">
                <div data-cy="not-found" className="text-xl font-bold mb-4">
                    Album not found
                </div>
                <Link href="/" className="btn btn-primary">
                    Back to reality
                </Link>
            </div>
        );
    }


    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div>
                    {album.name} by{" "}
                    <Link href={`/author/${album.author_id}`}>
                        {album.author_name}
                    </Link>
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
