import React from "react";
import propTypes from "prop-types";
function LanguagePicker({ setLanguage }) {
  const languages = [
    { code: "en", symbol: "🇸" },
    { code: "emoji", symbol: "😅" }
  ];
  const langauageIcon = languages.map(lang => (
    <span
      key={lang.code}
      data-test="language-icon"
      onClick={() => setLanguage(lang.code)}
    >
      {lang.symbol}
    </span>
  ));
  return <div data-test="component-language-picker">{langauageIcon}</div>;
}

LanguagePicker.propTypes = {
  setLanguage: propTypes.func.isRequired
};
export default LanguagePicker;
