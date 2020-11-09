
export type Type = string | symbol | number

export type UnwrapSingleKey<T> = {
  [K in keyof T]: T[K]
}[keyof T]

export type ExtractKey<T, K extends keyof T> =  UnwrapSingleKey<Pick<T, K>>



