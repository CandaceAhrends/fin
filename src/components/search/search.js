import React, { useEffect, useState } from "react";
import { fromEvent } from "rxjs";
import { take } from "rxjs/operators";
import SearchTrie from "./searchTrie";
import classNames from "classnames";
import "./search.scss";

const meetsCharLimit = (len) => len >= 1;

const Search = (props) => {
  const searchEnter = React.useRef("");
  const [predictedWords, setPredictedWords] = useState([]);
  const [isFound, setIsFound] = useState(false);
  const trie = new SearchTrie();

  useEffect(() => {
    props
      .selectionApi()
      .pipe(take(1))
      .subscribe((allSymbols) => {
        allSymbols
          .map((data) => data.symbol)
          .map((s) => {
            trie.insertWord(s);
          });
      });
  }, []);

  useEffect(() => {
    const search$ = fromEvent(searchEnter.current, "keyup").subscribe(
      (search) => {
        searchEnter.current.value = searchEnter.current.value.toUpperCase();
        setPredictedWords([]);
        if (meetsCharLimit(search.target.value.length)) {
          const words = trie.autoCompleteWords(search.target.value);
          trie.showAll();
          setIsFound(words.length);
          setPredictedWords(words);
        }
      }
    );

    return () => search$.unsubscribe();
  }, []);

  const selectItem = (item) => {
    props.handleSelection(item);
    searchEnter.current.value = "";
    setPredictedWords([]);
  };

  const onFocus = (evt) => {
    console.log("onFocus", evt.target.value);
  };
  const onBlur = (evt) => {
    console.log("onBlur", evt.target.value);
  };

  return (
    <>
      <div className="symbol-select">
        <input
          ref={searchEnter}
          class="search-input"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <ul className={predictedWords.length ? "show" : "hide"}>
          {predictedWords.map((word) => (
            <li onClick={() => selectItem(word)}>{word}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Search;
