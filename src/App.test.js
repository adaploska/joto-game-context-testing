import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";
import hookActions from "./actions/hookActions";

const mockGetSecretWord = jest.fn();
/**
 * Setup function for app component.
 * @param {string} secretWord - desired secretWord state value for test
 * @returns {ReactWrapper}
 */
const setup = () => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;
  return mount(<App />);

  // use mount, because useEffect not called on `shallow`
  // https://github.com/airbnb/enzyme/issues/2086
};
test("App renders without error ", () => {
  let wrapper = setup();
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});
describe("getSecretWord calls", () => {
  test("getSecretWord gets called on App mount", () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
  test("secretWord does not update on App mount", () => {
    let wrapper = setup();
    mockGetSecretWord.mockClear();
    wrapper.setProps();
    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});
