// import TypedEventEmitter from 'typed-emitter'

export async function asyncForEach<T>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => Promise<void>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export async function asyncForEachMap<K, V>(
  map: Map<K, V>,
  callback: (value: V, key: K, map: Map<K, V>) => Promise<void>
) {
  for (let [key, value] of map) {
    await callback(value, key, map)
  }
}

export async function asyncFind<T>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => Promise<boolean>
) {
  let match

  for (let index = 0; index < array.length; index++) {
    if ((await callback(array[index], index, array)) === true) {
      match = array[index]
      break
    }
  }

  return match
}

/**
 * Iterates an array, and returns the first element for which the predicate
 * returns a value.
 */
export function shortCircuit<T, R>(
  input: T[],
  predicate: (value: T, index: number, array: typeof input) => R | undefined
) {
  let output: R | undefined

  input.some(
    (value, index, array) => !!(output = predicate(value, index, array))
  )

  return output
}

// export function pipeEvent<E extends string>(
//   event: E,
//   source: TypedEventEmitter<{ [key in E]: (...args: any) => any }>,
//   target: TypedEventEmitter<{ [key in E]: (...args: any) => any }>
// ) {
//   source.on(event, (...args) => {
//     target.emit(event, ...args)
//   })
// }

/**
 * Hides a property from an object.
 */
export function protect(obj: any, property: string) {
  let descriptor = Object.getOwnPropertyDescriptor(obj, property) || {}
  descriptor.enumerable = false
  Object.defineProperty(obj, property, descriptor)
}

// https://fettblog.eu/typescript-hasownproperty/
export function hasOwnProperty<T extends {}, P extends PropertyKey>(
  obj: T,
  prop: P
): obj is T & Record<P, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

export function unique<T>(array: T[]) {
  return [...new Set(array)]
}
