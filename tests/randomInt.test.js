import { randomIntFromInterval } from "../src/utils";
import { faker } from "@faker-js/faker";
import { expect, test } from "@jest/globals";

test("with great params", () => {
  const min = faker.number.int(1, 5);
  const max = faker.number.int(6, 10);

  const result = randomIntFromInterval(min, max);
  expect(result).toBeGreaterThanOrEqual(min);
  expect(result).toBeLessThanOrEqual(max);
});

test("without correct params", () => {
  const min = "chien";
  const max = "chat";

  const result = randomIntFromInterval(min, max);
  expect(result).toBeGreaterThan(0);
  expect(result).toBeLessThan(11);
});
