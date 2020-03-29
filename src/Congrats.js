import React from "react";

import languagesContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import stringsModule from "./helpers/strings";
/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is false).
 */
const Congrats = () => {
  const language = React.useContext(languagesContext);
  const [success] = successContext.useSuccess();
  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, "congrats")}
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

export default Congrats;
