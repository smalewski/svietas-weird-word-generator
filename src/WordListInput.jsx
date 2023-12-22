import { useState, useRef } from "react";
import PropTypes from "prop-types";

function WordListInput({onSubmit, onClear}) {
  const [text, setText] = useState("");

  const fileInputRef = useRef(null);

    const reader = new FileReader();
    
    reader.onload = (event) => {
      const text = event.target.result;
      setText(text);
    }
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
    reader.readAsText(file);
    }
  };

  function handleSubmit() {
    const wordList = text.split("\n");
    onSubmit(wordList);
  }

  function clearText() {
    setText("");
    onClear();
  }

  return (
    <div className="flex-1">
      <div className="mx-4 p-2 border bg-white rounded-t-lg dark:bg-gray-800">
        <label htmlFor="wordlist" className="sr-only">
          Word list
        </label>
        <textarea
          id="wordlist"
          rows="10"
          className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
          placeholder="Enter your word list here"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className="flex items-center px-3 py-2 border-t dark:border-gray-600">
        <button
          type="submit"
          className="inline-flex mx-2 items-center py-2.5 px-4 text-xs font-medium text-center text-gey-500 bg-pastel-main rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-pastel-cta"
          onClick={handleSubmit}
        >
          Generate
        </button>
        <button
          type="submit"
          className="inline-flex mx-2 items-center py-2.5 px-4 text-xs font-medium text-center text-gey-500 bg-pastel-main rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-pastel-cta"
          onClick={clearText}
        >
          Clear
        </button>
        <div className="flex ml-auto ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
           <input 
        type="file" 
        style={{ display: 'none' }} 
        ref={fileInputRef} 
        onChange={handleFileChange} 
      />
          <button
            type="button"
            className="inline-flex items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            onClick={handleButtonClick}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 20"
            >
              <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
              />
            </svg>
            <span className="sr-only">Upload file</span>
          </button>
        </div>
      </div>
    </div>
  );
}

WordListInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
};
export default WordListInput;
