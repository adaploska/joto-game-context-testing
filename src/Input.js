import React from "react";
import PropTypes from "prop-types";
import languagesContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import stringsModule from "./helpers/strings";
function Input({ secretWord }) {
  const language = React.useContext(languagesContext);
  const [success, setSuccess] = successContext.useSuccess();
  console.log(success);
  const [currentGuess, setCurrentGuess] = React.useState("");
  if (success) {
    return null;
  }
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage(
            language,
            "guessInputPlaceholder"
          )}
          // placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
          value={currentGuess}
          onChange={event => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={event => {
            event.preventDefault();
            if (currentGuess === secretWord) {
              setSuccess(true);
            }
            setCurrentGuess("");
          }}
        >
          {stringsModule.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
};
export default Input;
