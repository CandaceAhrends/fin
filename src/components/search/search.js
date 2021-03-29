import React, { useEffect } from "react";
import { fromEvent } from "rxjs";
import "./search.scss";

const Search = () => {
  const searchEnter = React.useRef(null);

  useEffect(() => {
    console.log("set up listener");

    const search$ = fromEvent(
      searchEnter.current,
      "change"
    ).subscribe((search) => console.log(search.target.value, { search }));

    return () => search$.unsubscribe();
  }, []);

  return (
    <>
      <input ref={searchEnter} class="search-input" />
    </>
  );
};

export default Search;
