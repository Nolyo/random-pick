import { makeEmbed } from "../src/utils";
import { faker } from "@faker-js/faker";

function createClassicMessage() {
  return {
    color: faker.internet.color(),
    title: faker.lorem.sentence(),
    url: faker.internet.url(),
    description: faker.lorem.sentence(),
    thumbnail: faker.image.url(),
    footer: faker.lorem.sentence(),
  };
}

test("return correct embed", () => {
  const data = { classicMessage: createClassicMessage() };
  const members = ["John", "Doe", "Foo", "Bar"];
  const countPeople = members.length;
  const embed = makeEmbed(members, data);

  expect(embed.description).toEqual(data.classicMessage.description);
  expect(embed.title).toEqual(data.classicMessage.title);
  expect(embed.url).toEqual(data.classicMessage.url);
  expect(embed.color).toEqual(parseInt(data.classicMessage.color, 16));
  expect(embed.fields.length).toEqual(countPeople);
  expect(members.length).toEqual(0);
});

test("return correct position", () => {
  const data = { classicMessage: createClassicMessage() };
  const members = ["John", "Doe", "Foo", "Bar"];
  const embed = makeEmbed(members, data);

  const ordered = embed.fields;
  for (let i = 0; i < ordered.length; i++) {
    expect(ordered[i].name).toEqual(`Position ${i + 1}`);
  }
});

test("return correct embed without some properties", () => {
  const data = {
    classicMessage: createClassicMessage(),
  };

  delete data.classicMessage.title;
  delete data.classicMessage.url;

  const members = ["John", "Doe", "Foo", "Bar"];
  const countPeople = members.length;
  const embed = makeEmbed(members, data);

  expect(embed.title).toBeUndefined();
  expect(embed.url).toBeUndefined();
  expect(embed.description).toEqual(data.classicMessage.description);
  expect(embed.color).toEqual(parseInt(data.classicMessage.color, 16));
  expect(embed.fields.length).toEqual(countPeople);
  expect(members.length).toEqual(0);
});

test("return correct embed without members", () => {
  const data = {
    classicMessage: createClassicMessage(),
  };

  const members = [];
  const embed = makeEmbed(members, data);

  expect(embed.description).toEqual(data.classicMessage.description);
  expect(embed.title).toEqual(data.classicMessage.title);
  expect(embed.url).toEqual(data.classicMessage.url);
  expect(embed.color).toEqual(parseInt(data.classicMessage.color, 16));
  expect(embed.fields.length).toEqual(0);
  expect(members.length).toEqual(0);
});
