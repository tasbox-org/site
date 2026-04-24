export type ElementOf<U> = U extends (infer Element)[] ? Element : never;
