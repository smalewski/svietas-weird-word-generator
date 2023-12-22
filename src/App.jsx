import "./App.css";
import WordList from "./WordList";
import WordListInput from "./WordListInput";
import ButtonNumber from "./ButtonNumber";
import TextInput from "./TextInput";
import { useState } from "react";
import WordGenerator from "./generator";

function App() {
  const [generatedWords, setGeneratedWords] = useState([]);
  const [prefix, setPrefix] = useState("");
  const [order, setOrder] = useState(1);
  const [minimumLength, setMinimumLength] = useState(3);
  const [maximumLength, setMaximumLength] = useState(8);
  const [numberOfWords, setNumberOfWords] = useState(50);

  function generateWords(words) {
    const gen = new WordGenerator(order, words);

    var wordList = []
    for (let i = 0; i < numberOfWords; i++) {
      const word = gen.generateWord(prefix, minimumLength, maximumLength);
      wordList.push(word);
    }

    setGeneratedWords(wordList);
  }

  function onClear() {
    setGeneratedWords([]);
  }

  return (
    <div className="container mx-auto px-4">
          <h1 className="text-4xl pb-4">Weird Word Generator</h1>
          <div className="flex">
              <WordListInput onClear={onClear} onSubmit={generateWords}/> 
             <div className="flex-1"> 
              <div className="grid gap-3 md:grid-cols-2"> 
                <ButtonNumber onChange={setMinimumLength} labelName={"Minimum length"} value={minimumLength} />
                <ButtonNumber onChange={setMaximumLength} labelName={"Maximum length"} value={maximumLength} /> 
                <ButtonNumber onChange={setNumberOfWords} labelName={"Number of words"} value={numberOfWords} />
                <ButtonNumber onChange={setOrder} labelName={"Dependency"} value={order} /> 
                <TextInput onChange={setPrefix} labelName={"Prefix"} value={prefix} /> 
              </div>
          </div> 
        </div> 
        <div> 
          <WordList wordList={generatedWords} /> 
        </div>
    </div>
  );
}

export default App;
