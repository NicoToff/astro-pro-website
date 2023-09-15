export type StringFieldsKeysInObject<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type ArrayFieldsInObject<T> = {
  [K in keyof T]: T[K] extends readonly any[] ? K : never;
}[keyof T];

type ObjectFieldsInObjectIncludingArrays<T> = {
  [K in keyof T]: T[K] extends { [key: string]: any } ? K : never;
}[keyof T];

export type ObjectFieldsKeysInObject<T> = Exclude<ObjectFieldsInObjectIncludingArrays<T>, ArrayFieldsInObject<T>>;

export type ToString<N> = N extends number ? `${N}` : never;
