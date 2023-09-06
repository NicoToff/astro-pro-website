export type Writeable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type ArrayFields<T> = {
  [K in keyof T]: T[K] extends readonly any[] ? K : never;
}[keyof T];
