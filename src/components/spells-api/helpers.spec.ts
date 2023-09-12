// @ts-nocheck
import { initialSearchState } from "./constants";
import { deepPurgeEmptyFields, filterIsEmpty } from "./helpers";
import type { Writeable } from "astro/zod";

describe("testing helpers", () => {
  test("deepPurgeEmptyFields should leave non-empty arrayFields alone", () => {
    const mock = {
      arrayField: ["value1", "value2"],
    };
    expect(deepPurgeEmptyFields(mock)).toEqual(mock);
  });
  test("purgeEmptyFields", () => {
    const mock = {
      field: "",
      arrayField: [],
      objectField: {},
      booleanField: false,
      trueField: true,
      nestedObjectField: {
        field: false,
        arrayField: [],
        other: true,
      },
    };
    const expected = {
      trueField: true,
      nestedObjectField: {
        other: true,
      },
    };
    expect(deepPurgeEmptyFields(mock)).toEqual(expected);
  });
  test("purgeEmptyFields nested", () => {
    const input = {
      a: "value1",
      b: "",
      c: {
        d: null,
        e: {
          f: false,
          g: {},
          h: "value2",
        },
      },
    };
    const expected = {
      a: "value1",
      c: { e: { h: "value2" } },
    };
    expect(deepPurgeEmptyFields(input)).toEqual(expected);
  });

  test("purgeEmptyFields nested", () => {
    const input = {
      a: "value1",
      b: "",
      c: {
        d: null,
        e: {
          f: false,
          g: {
            i: "",
            j: [""],
            k: ["hey"],
          },
          h: "value2",
        },
      },
    };
    const expected = {
      a: "value1",
      c: {
        e: {
          g: {
            k: ["hey"],
          },
          h: "value2",
        },
      },
    };
    expect(deepPurgeEmptyFields(input)).toEqual(expected);
  });

  test("filterIsEmpty should see the initialSearchState as empty", () => {
    const mock = structuredClone(initialSearchState);
    expect(filterIsEmpty(mock)).toBe(true);
  });
  test("filterIsEmpty should see a non-empty filter as not empty", () => {
    const mock = structuredClone(initialSearchState) as Writeable<typeof initialSearchState>;
    mock.name = "something";
    expect(filterIsEmpty(mock)).toBe(false);
  });
  test("filterIsEmpty should see a nested value as a non-empty filter", () => {
    const mock = structuredClone(initialSearchState) as Writeable<typeof initialSearchState>;
    mock.sources.Cleric = true;
    expect(filterIsEmpty(mock)).toBe(false);
  });
});
