import { deepPurgeEmptyFields } from "./helpers";

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
});
