import PropTypes from "prop-types";

function ButtonNumber({ labelName, value, onChange }) {

  // Event handler for incrementing the number
  const handleIncrement = () => {
    onChange(value + 1);
  };

  // Event handler for decrementing the number
  const handleDecrement = () => {
    onChange(value > 1 ? value - 1 : 1);
  };

  const handleChange = (e) => {
    // e.target.value cast to number
    const val = Number(e.target.value);
    const num = val && val > 0 ? val : 1;
    onChange(num);
  }

  return (
    <div>
      <label
        htmlFor="quantity-input"
        className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {labelName}
      </label>
      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          onClick={handleDecrement}
          id="decrement-button"
          data-input-counter-decrement="quantity-input"
          className="bg-pastel-main dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-pastel-cta border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          id="quantity-input"
          data-input-counter
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        <button
          type="button"
          onClick={handleIncrement}
          id="increment-button"
          data-input-counter-increment="quantity-input"
          className="bg-pastel-main dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-pastel-cta border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

ButtonNumber.propTypes = {
  labelName: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ButtonNumber;
