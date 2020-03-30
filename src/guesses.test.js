import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import successContext from "./contexts/successContext";
import guessWorsContext from "./contexts/guessedWordContext";
import Input from "./Input";
import GuessedWords from "./GuessedWords";
function setup(guessedWordsString = [], secretWord = "party") {
  const wrapper = mount(
    <guessWorsContext.GuessedWordsProvider>
      <successContext.SuccessProvider>
        <Input secretWord={secretWord}></Input>
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessWorsContext.GuessedWordsProvider>
  );
  const inputBox = findByTestAttr(wrapper, "input-box");
  const submitButton = findByTestAttr(wrapper, "submit-button");

  guessedWordsString.map(word => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate("change", mockEvent);
    submitButton.simulate("click");
  });
  return [wrapper, inputBox, submitButton];
}
describe("test word guess", () => {
  let wrapper;
  let inputBox;
  let submitButton;
  describe("non-empty guessWord", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup(["agile"], "party");
    });
    describe("correct guess", () => {
      //
      beforeEach(() => {
        const mockEvent = { target: { value: "party" } };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });
      test("input component not render children, there is null", () => {
        const inputComponent = findByTestAttr(wrapper, "input-component");
        expect(inputComponent.children().length).toBe(0);
      });
    });
    describe("not correct guess", () => {
      beforeEach(() => {
        const mockEvent = { target: { value: "train" } };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });
      test("input component  render children, there are children", () => {
        expect(inputBox.exists()).toBe(true);
      });
    });
  });
});
