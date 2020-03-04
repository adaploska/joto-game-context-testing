import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";
import { exportAllDeclaration } from "@babel/types";
/**
 * Setup function for app component.
 * @param {string} secretWord - desired secretWord state value for test
 * @returns {ReactWrapper}
 */
const setup = () => {
  return shallow(<App />);
};
test("App renders without error ", () => {
  let wrapper = setup();
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});
