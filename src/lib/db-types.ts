import { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

// Definícia tabuľky albums
export interface AlbumsTable {
  id: ColumnType<number, number | undefined, number>;
  name: string;
  release_date: string;
  author_id: number;
}

// Definícia tabuľky authors
export interface AuthorsTable {
  id: ColumnType<number, number | undefined, number>;
  name: string;
  bio: string | null;
}

// Definícia tabuľky songs
export interface SongsTable {
  id: ColumnType<number, number | undefined, number>;
  name: string;
  duration: number;
  album_id: number;
}

// Hlavný database interface
export interface Database {
  albums: AlbumsTable;
  authors: AuthorsTable;
  songs: SongsTable;
}

// Helper typy pre prácu s dátami
export type Album = Selectable<AlbumsTable>;
export type NewAlbum = Insertable<AlbumsTable>;
export type AlbumUpdate = Updateable<AlbumsTable>;

export type Author = Selectable<AuthorsTable>;
export type NewAuthor = Insertable<AuthorsTable>;
export type AuthorUpdate = Updateable<AuthorsTable>;

export type Song = Selectable<SongsTable>;
export type NewSong = Insertable<SongsTable>;
export type SongUpdate = Updateable<SongsTable>;