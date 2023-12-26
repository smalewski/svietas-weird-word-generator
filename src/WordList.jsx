import { useState, useMemo } from "react";
import uFuzzy from "@leeoniya/ufuzzy";
import {Grid, Input} from "@mui/joy";

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
    <div className="">
      <Input
        type="text"
        placeholder="Search words..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br/>
      <br/>

      <Grid container spacing={2}>
        { indices 
        ?
        indices.map((index) => (
          <Grid xs={2} key={index}>
            {words[index]}
          </Grid>
        ))
        :
        <Grid xs={12}>
          No results found
        </Grid>
      }
      </Grid>
    </div>
  );
}

WordList.propTypes = {
  wordList: PropTypes.array.isRequired,
};

export default WordList;
