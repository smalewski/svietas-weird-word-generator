import PropTypes from "prop-types";

function TextInput({labelName, value, onChange}) {


  const handleChange = (e) => {
    onChange(e.target.value);
  }

    return (
<div>
            <label htmlFor="label_name" className="text-left  block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labelName}</label>
            <input  value={value} onChange={handleChange} type="text" id="label_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-pastel-accent block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
        </div>
        )
}

TextInput.propTypes = {
  labelName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;