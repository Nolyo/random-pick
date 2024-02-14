import { getActivedUsers } from "../src/utils";
import { expect, test } from "@jest/globals";

test("Return correct filtered list of activated users", () => {
  const users = [
    { name: "John", activated: "true" },
    { name: "Doe", activated: "false" },
    { name: "Foo", activated: "true" },
    { name: "Bar", activated: "false" },
  ];

  const result = getActivedUsers(users);
  expect(result).toEqual(["John", "Foo"]);
});

test("Return correct filtered list of activated users", () => {
  const users = [
    { activated: "true" },
    { name: "Doe", activated: "false" },
    { name: "John", activated: "true" },
  ];

  const result = getActivedUsers(users);
  expect(result).toEqual(["John"]);
});
