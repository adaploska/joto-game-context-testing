import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import LanguagePicker from "./LanguagePicker";

const mockSetLanguage = jest.fn();
const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};
test("renders without error ", () => {
  let wrapper = setup();
  const component = findByTestAttr(wrapper, "component-language-picker");
  expect(component.exists()).toBe(true);
});
test("does not throw worning with expected props", () => {
  checkProps(LanguagePicker, { setLanguage: jest.fn() });
});
test("renders non-sero langauge icons", () => {
  let wrapper = setup();
  const languageIcon = findByTestAttr(wrapper, "language-icon");
  expect(languageIcon.length).toBeGreaterThan(0);
});
test("calls setLangauge prop upon click button", () => {
  let wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon");
  let firstIcon = languageIcons.first();
  firstIcon.simulate("click");
  expect(mockSetLanguage).toHaveBeenCalled();
});
