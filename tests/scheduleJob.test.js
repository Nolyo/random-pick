import { scheduleJobs } from "../src/utils";
import { WebhookClient } from "discord.js";
import cron from "node-cron";
import { jest } from "@jest/globals";

afterEach(() => {
  jest.restoreAllMocks();
});

test("Return correct filtered list of activated users", () => {
  const data = {
    jobs: [
      {
        activated: "true",
        cron: "0 0 * * *",
        users: [
          { name: "John", activated: "true" },
          { name: "Doe", activated: "false" },
          { name: "Foo", activated: "true" },
          { name: "Bar", activated: "false" },
        ],
      },
      {
        activated: "true",
        cron: "0 0 * * *",
        users: [
          { name: "John", activated: "true" },
          { name: "Doe", activated: "false" },
          { name: "Foo", activated: "true" },
          { name: "Bar", activated: "false" },
        ],
      },
    ],
  };

  const spy = jest.spyOn(cron, "schedule");
  const webhook = {
    send: jest.fn(),
  };
  scheduleJobs(data, webhook);
  expect(spy).toHaveBeenCalledTimes(2);
});
