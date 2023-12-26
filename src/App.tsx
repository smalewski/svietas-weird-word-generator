import "./App.css";
import WordList from "./WordList";
import WordListInput from "./WordListInput";
import { useEffect, useState } from "react";
import WordGenerator from "./generator";
import React from "react";
import RangeSlider from "./RangeSlider";
import { Button, FormLabel } from "@mui/material";
import langEnglish from "./languages/english.json";
import langSvieta from "./languages/svieta.json";
import {
  Box,
  Grid,
  Tooltip,
  Select,
  Option,
  Input,
  FormControl,
} from "@mui/joy";

type Languages = {
  [key: string]: string[];
};

function App() {
  const [generatedWords, setGeneratedWords] = useState(null);
  const [prefix, setPrefix] = useState("");
  const [order, setOrder] = useState(3);
  const [minimumLength, setMinimumLength] = useState(5);
  const [maximumLength, setMaximumLength] = useState(8);
  const [numberOfWords, setNumberOfWords] = useState(50);
  const [language, setLanguage] = useState("English");
  const [languages, setLanguages] = useState<Languages>({});
  const [custom, setCustom] = useState("");

  function loadDefaultLanguages() {
    const langs = {
      English: langEnglish,
      Svieta: langSvieta,
      Custom: [],
    };
    setLanguages(langs);
  }

  useEffect(() => {
    loadDefaultLanguages();
  }, [langEnglish, langSvieta]);

  function loadCustomLanguage() {
    const words = custom.split(/[ \n\t]+/);
    const langs = languages;
    langs["Custom"] = words;
    setLanguages(langs);
  }

  function generateWords() {
    if (language === "Custom") {
      loadCustomLanguage();
    }

    const words = languages[language];
    const gen = new WordGenerator(order, words);

    var wordList = [];
    for (let i = 0; i < numberOfWords; i++) {
      const word = gen.generateWord(prefix, minimumLength, maximumLength);
      wordList.push(word);
    }

    setGeneratedWords(wordList);
  }

  function handleChangeLanguage(language: string): void {
    setLanguage(language);
  }

  function onClear(): void {
    setGeneratedWords([]);
  }

  return (
    <>
      <h1 className="">Weird Word Generator</h1>
      <h3 className="">Generate weird words from a list of words</h3>
      <div className="">
        <div className="">
          <Grid container spacing={2}>
            <Grid sm={12}>
              <FormControl>
                <Tooltip title="BLAAA" color="primary">
                  <FormLabel>Word length range</FormLabel>
                </Tooltip>
                <RangeSlider
                  bot={1}
                  top={10}
                  min={minimumLength}
                  max={maximumLength}
                  setMin={setMinimumLength}
                  setMax={setMaximumLength}
                  labelName={"Word length range"}
                />
              </FormControl>
            </Grid>
            <Grid sm={4}>
              <FormControl>
                <Tooltip title="BLAAA" color="primary">
                  <FormLabel>Number of words</FormLabel>
                </Tooltip>
                <Input
                  type="number"
                  onChange={(e) =>
                    setNumberOfWords(parseInt(e.target.value, 10))
                  }
                  value={numberOfWords}
                  variant="soft"
                  color="primary"
                />
              </FormControl>
            </Grid>
            <Grid sm={6}>
              <FormControl>
                <Tooltip title="BLAAA" color="primary">
                  <FormLabel>Prefix of the generated words</FormLabel>
                </Tooltip>
                <Input
                  color="primary"
                  variant="soft"
                  onChange={(e) => setPrefix(e.target.value)}
                  value={prefix}
                />
              </FormControl>
            </Grid>
            <Grid sm={4}>
              <FormControl>
                <Tooltip title="BLAAA" color="primary">
                  <FormLabel>Order</FormLabel>
                </Tooltip>
                <Input
                  type="number"
                  variant="soft"
                  color="primary"
                  onChange={(e) => setOrder(parseInt(e.target.value, 10))}
                  value={order}
                />
              </FormControl>
            </Grid>
            <Grid sm={6}>
              <FormControl>
                <Tooltip title="BLAAA" color="primary">
                  <FormLabel>Language</FormLabel>
                </Tooltip>
                <Select
                  color="primary"
                  placeholder="Choose a language"
                  variant="soft"
                  defaultValue="English"
                  onChange={(_, v) => handleChangeLanguage(v)}
                >
                  {Object.keys(languages).map((lang) => (
                    <Option key={lang} value={lang}>
                      {lang}
                    </Option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ pt: 2 }}>
            {language === "Custom" ? (
              <WordListInput setText={setCustom} />
            ) : (
              <></>
            )}
          </Box>
          <Box sx={{ py: 2 }}>
            <Button variant="contained" color="primary" onClick={generateWords}>
              Generate
            </Button>
          </Box>
        </div>
      </div>
      <Box>
        {generatedWords ? <WordList wordList={generatedWords} /> : <></>}
      </Box>
    </>
  );
}

export default App;
