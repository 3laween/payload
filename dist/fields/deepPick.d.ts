type AllKeysOfType<T> = {
    [P in keyof T]: T[P] extends never ? never : P;
}[keyof T];
type RemoveNever<T> = Pick<T, AllKeysOfType<T>>;
type Primitive = string | number | boolean | String | Number | Boolean | Date | null | undefined;
export type DeepPickKeys<Type> = Type extends Array<unknown> ? {
    [Key in keyof Type]: DeepPickKeys<Type[Key]>;
}[number] : {
    [Key in keyof Type]: Key extends string ? Type[Key] extends Primitive ? `${Key}` : `${Key}` | `${Key}.${DeepPickKeys<Type[Key]>}` : never;
}[keyof Type];
export type DeepPick<Type, Query extends DeepPickKeys<Type>> = RemoveNever<{
    [Key in keyof Type]: Type extends Array<any> ? Query extends DeepPickKeys<Type[Key]> ? RemoveNever<DeepPick<Type[Key], Query>> : never : Key extends Query ? Type[Key] : Key extends string ? Query extends `${Key}.${infer SubQuery}` ? SubQuery extends DeepPickKeys<Type[Key]> ? RemoveNever<DeepPick<Type[Key], SubQuery>> : never : never : never;
}>;
export declare function deepPick<T, U extends DeepPickKeys<T>>(obj: T, paths: Array<U>): DeepPick<T, typeof paths[number]>;
export {};
