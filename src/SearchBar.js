import React from "react";
import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.value)}
      ></input>
    </div>
  );
}
