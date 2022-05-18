import App from "./App";

const index = require("./index");

describe("inex file testing", () => {
  it("Should render app without crashing", () => {
    expect(
      JSON.stringify(
        Object.assign({}, index, { _reactInternalInstance: "censord" })
      )
    ).toMatchSnapshot();
  });
});
