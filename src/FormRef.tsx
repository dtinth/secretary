export namespace FormRef {
  export type Resolvable<Data = any> = string | number | Resolvable[]

  export interface Reference<T = any, B = any> {
    read(base: B): T
    write(base: B, updater: (value: T) => T): B
  }

  export function resolve(resolvable: Resolvable): Reference {
    if (typeof resolvable === 'string') {
      return {
        read: (base) => base[resolvable],
        write: (base, updater) => {
          base = { ...base }
          base[resolvable] = updater(base[resolvable])
          return base
        },
      }
    }
    if (typeof resolvable === 'number') {
      return {
        read: (base) => base[resolvable],
        write: (base, updater) => {
          base = [...base]
          base[resolvable] = updater(base[resolvable])
          return base
        },
      }
    }
    throw new Error('Unresolvable')
  }
}
