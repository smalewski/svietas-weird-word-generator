import "./App.css";
import WordList from "./WordList";
import { useEffect, useState } from "react";
import WordGenerator from "./generator";
import React from "react";
import RangeSlider from "./RangeSlider";
import { Button, FormLabel } from "@mui/material";
import langEnglish from "./languages/english.json";
import langSvieta from "./languages/svieta.json";
import langPokemonFr from "./languages/pokemon_fr.json";
import {
  Stack,
  Box,
  Grid,
  Tooltip,
  Select,
  Option,
  Input,
  FormControl,
  Typography,
  Textarea,
} from "@mui/joy";
import InfoIcon from "@mui/icons-material/Info";

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
      "French Pokémon": langPokemonFr,
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
      <Stack direction="column" spacing={2}>
        <Typography level="h1">Weird Word Generator</Typography>
        <Typography level="h3">
          Create new, playful words from your list of favorites.
        </Typography>
      </Stack>
      <Stack direction="row" spacing={4} sx={{ py: 4 }}>
        <Typography level="body-md" sx={{ textAlign: "justify" }}>
          <Typography color="primary">Weird Word Weaver</Typography> is a simple
          yet engaging app designed for those who enjoy wordplay and creative
          writing. With its straightforward interface, the app turns a list of
          words into a source of inspiration, generating new and interesting
          words. It's particularly useful for anyone looking to add a unique
          twist to their writing, create novel names for characters or projects,
          or just have fun exploring new linguistic combinations.
        </Typography>
        <Typography level="body-md" sx={{ textAlign: "justify" }}>
          The magic of{" "}
          <Typography color="primary">Weird Word Weaver</Typography> lies in its
          use of Markov chains, where the
          <Typography color="success" variant="soft">
            order
          </Typography>{" "}
          of the chain is a key feature. This{" "}
          <Typography color="success" variant="soft">
            order
          </Typography>{" "}
          determines how many of the last letters in a word the app considers
          when predicting the next letter. For instance, with an order of 2, the
          app analyzes the last two letters and uses the patterns in your input
          words to decide the subsequent letter. This balance of randomness and
          pattern-based structure makes{" "}
          <Typography color="primary">Weird Word Weaver</Typography> a
          fascinating tool for those interested in the playful side of language.
        </Typography>
      </Stack>
      <div className="">
        <div className="">
          <Grid container spacing={2}>
            <Grid sm={12}>
              <FormControl>
                <Tooltip
                  placement="top"
                  title="Adjust the slider to set the minimum and maximum length for the generated words."
                  color="primary"
                >
                  <FormLabel>Word Length Range</FormLabel>
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
                <Tooltip
                  placement="top"
                  title="Enter the number of new words you'd like to create."
                  color="primary"
                >
                  <FormLabel>Number of Words to Generate</FormLabel>
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
                <Tooltip
                  placement="top"
                  title="Specify a beginning sequence for the generated words; the app will use this prefix as a starting point."
                  color="primary"
                >
                  <FormLabel>Word Prefix</FormLabel>
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
                <Tooltip
                  placement="top"
                  title="Choose an order of 2 or 3 for a good balance. Higher values might result in generating words identical to the supplied ones, while an order of 1 can lead to very random outcomes."
                  color="primary"
                >
                  <FormLabel>Markov Chain Order</FormLabel>
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
                <Tooltip
                  placement="top"
                  title="Choose your word list: select 'English' for a diverse set of 10,000 words, 'Svieta’s List' for a specially curated collection, 'French Pokémon' for 1025 pokémon names in French, or 'Custom' to use your own list."
                  color="primary"
                >
                  <FormLabel>Language Selection</FormLabel>
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
              <FormControl>
                <FormLabel>
                  <Tooltip
                    placement="top"
                    title="Enter your own list of words, separated by spaces or line breaks."
                    color="primary"
                  >
                    <Box>Custom Word List</Box>
                  </Tooltip>
                </FormLabel>
                <Textarea
                  onChange={(e) => setCustom(e.target.value)}
                  minRows={10}
                  variant="soft"
                />
                ;
              </FormControl>
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
