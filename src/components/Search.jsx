import { useState } from "react";

/*
  Components take props objects, so you could also define this as `Search(props)` where props is an object
  that looks like {handleSearch: <someFunction>, placeholder: <string>}.
  Then you'd call props.handleSearch() or props.placeholder;
  we're `destructuring` handleSearch from props - this is a common pattern
 */

export default function Search({ placeholder, handleSearch }) {
  // state name, state setter, and use state gets the initial value (it'll be `undefined` if you omit)
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
