export type Writeable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type StringFields<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type ArrayFields<T> = {
  [K in keyof T]: T[K] extends readonly any[] ? K : never;
}[keyof T];

type ObjectFieldsWithArrays<T> = {
  [K in keyof T]: T[K] extends { [key: string]: any } ? K : never;
}[keyof T];

export type ObjectFields<T> = Exclude<ObjectFieldsWithArrays<T>, ArrayFields<T>>;

export type ToString<N> = N extends number ? `${N}` : N;
