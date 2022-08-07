export interface DataAccessor<B, T> {
  read(base: B): T
  write(base: B, updater: (value: T) => T): B
}

export class DataReference<B, T> {
  constructor(public accessor: DataAccessor<B, T>) {}
  child<K extends keyof T>(key: K): DataReference<B, T[K]> {
    return new DataReference({
      read: (base) => this.accessor.read(base)[key],
      write: (base, updater) => {
        return this.accessor.write(base, (oldParent: any) => {
          const oldValue = oldParent[key]
          const newValue = updater(oldValue)
          if (oldValue === newValue) {
            return oldParent
          }
          const newParent = (
            Array.isArray(oldParent) ? [...oldParent] : { ...oldParent }
          ) as T
          newParent[key] = newValue
          return newParent
        })
      },
    })
  }
  static root<T>() {
    return rootDataReference as DataReference<T, T>
  }
}

const rootDataReference = new DataReference<any, any>({
  read: (base) => base,
  write: (base, updater) => updater(base),
})
