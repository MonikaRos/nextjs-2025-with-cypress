"use client";

import Link from "next/link";
import { useState } from "react";

export function NavBar() {
  const [searchInput, setSearchInput] = useState("");

  console.log("NavBar render searchInput:", searchInput);

  const searchLinkQuery = searchInput !== "" ? { q: searchInput } : {};

  return (
    <div className="navbar bg-base-100 shadow-sm" data-cy="navbar">
      <div className="flex-1">
        <Link 
          href="/" 
          className="btn btn-ghost text-xl"
          data-cy="title"
        >
          Spotify
        </Link>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
          data-cy="search-input"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <Link
          href={{
            pathname: "/search",
            query: searchLinkQuery,
          }}
          className="btn btn-ghost text-xl"
          data-cy="search-button"
        >
          Search
        </Link>
      </div>
    </div>
  );
}