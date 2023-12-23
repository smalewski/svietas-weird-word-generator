import { useState, useMemo } from "react";
import uFuzzy from "@leeoniya/ufuzzy";

import PropTypes from "prop-types";

function getUniqueCharacters(strings) {
    const allChars = strings.join('');
    const uniqueChars = new Set(allChars);
    return Array.from(uniqueChars).join('');
}

function randomize(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function WordList({ wordList }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  const [words, setWords] = useState(wordList);
  useMemo(() => {setWords(wordList)}, [wordList]);

  const chars = getUniqueCharacters(wordList);
  const fuzzyOptions = { alpha: chars };
  const uf = new uFuzzy(fuzzyOptions);
  const results = uf.search(words, searchTerm);
  const indices = searchTerm
    ? results[0]
    : [...Array(words.length).keys()];


  function toggleSort() {
    setIsSorted(!isSorted);

      if (!isSorted) {
        words.sort()
      } else {
        randomize(words)
      }

    }

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search words..."
        className="mb-4 p-2 border rounded focus:border-pastel-accent"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

        <button
          type="submit"
          className="inline-flex mx-2 items-center py-2.5 px-4 text-xs font-medium text-center text-gey-500 bg-pastel-main rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-pastel-cta"
          onClick={toggleSort}
        > {isSorted ? "Randomize" : "Sort"} </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        { indices 
        ?
        indices.map((index) => (
          <div key={index} className="p-4 border dark:bg-gray-700 rounded shadow text-gray-800 dark:text-gray-400">
            {words[index]}
          </div>
        ))
        :
        <div className="p-4 border dark:bg-gray-700 rounded shadow text-gray-800 dark:text-gray-400">
          No results found
        </div>
      }
      </div>
    </div>
  );
}

WordList.propTypes = {
  wordList: PropTypes.array.isRequired,
};

export default WordList;
