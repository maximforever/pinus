import { useState } from "react";

export default function Search({ placeholder, handleSearch }) {
  const [query, setQuery] = useState("");

  function handleTyping(event) {
    setQuery(event.target.value);
  }

  return (
    <div className="search-bar">
      <input
        className="search-input"
        onChange={handleTyping}
        placeholder={placeholder}
      />
      <button onClick={() => handleSearch(query)}>Search</button>
    </div>
  );
}
