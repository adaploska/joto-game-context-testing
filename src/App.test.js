import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";
import hookActions from "./actions/hookActions";
import { exists } from "fs";

const mockGetSecretWord = jest.fn();
/**
 * Setup function for app component.
 * @param {string} secretWord - desired secretWord state value for test
 * @returns {ReactWrapper}
 */
const setup = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn().mockReturnValue([{ secretWord }, jest.fn()]);
  React.useReducer = mockUseReducer;
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
describe("secretWord is not null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup("party");
  });
  test("render App when secretWord is not null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(true);
  });
  test("does not render spinner when secretWord is not null", () => {
    const spinner = findByTestAttr(wrapper, "spinner");
    expect(spinner.exists()).toBe(false);
  });
});
describe("secretWord is n null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });
  test("does not render App when secretWord is null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(false);
  });
  test("renders spinner when secretWord is null", () => {
    const spinner = findByTestAttr(wrapper, "spinner");
    expect(spinner.exists()).toBe(true);
  });
});
