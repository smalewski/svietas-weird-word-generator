import React from "react";
import { Box, Textarea } from "@mui/joy";

export default function WordListInput(props) {
  function handleChange(e) {
    props.setText(e.target.value);
  }

  return (
    <Box spacing={2}>
      <Textarea onChange={handleChange} minRows={10} variant="soft" />;
    </Box>
  );
}
// function WordListInput(props) {
//   const [text, setText] = useState("");

//   const fileInputRef = useRef(null);

//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const text = event.target.result;
//       setText(text);
//     }
//   const handleButtonClick = () => {
//     fileInputRef.current?.click();
//   }

//   const handleFileChange = (event) => {
//     const file = event.target.files ? event.target.files[0] : null;
//     if (file) {
//     reader.readAsText(file);
//     }
//   };

//   function handleSubmit() {
//     const wordList = text.split("\n");
//     onSubmit(wordList);
//   }

//   function clearText() {
//     setText("");
//     onClear();
//   }

//   return (
//     <div className="">
//       <div className="">
//         <label htmlFor="wordlist" className="">
//           Word list10
//         </label>
//         <TextAreaAutosize
//           id="wordlist"
//           maxRows={10}
//           minRows={5}
//           className=""
//           placeholder="Enter your word list here"
//           required
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         ></TextAreaAutosize>
//       </div>
//       <div className="">
//         <Button
//           color="primary"
//           onClick={handleSubmit}
//         >
//           Generate
//         </Button>
//         <Button
//         color="secondary"
//           onClick={clearText}
//         >
//           Clear
//         </Button>
//         <div className="">
//            <input
//         type="file"
//         style={{ display: 'none' }}
//         ref={fileInputRef}
//         onChange={handleFileChange}
//       />
//           <Button
//           color="secondary"
//             className=""
//             onClick={handleButtonClick}
//           >
//           Upload file
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// WordListInput.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//     onClear: PropTypes.func.isRequired,
// };
// export default WordListInput;
