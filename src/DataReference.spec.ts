import { expect, it } from 'vitest'
import { DataReference } from './DataReference'

const fixture = { a: 1, b: 'cool' }
const root = DataReference.root<typeof fixture>()

it('reads data', async () => {
  expect(root.accessor.read(fixture)).toEqual(fixture)
})

it('reads child', async () => {
  expect(root.child('a').accessor.read(fixture)).toEqual(1)
  expect(root.child('b').accessor.read(fixture)).toEqual('cool')
})

it('updates child', async () => {
  const newFixture = root
    .child('a')
    .accessor.write(fixture, (value) => value + 1)
  expect(fixture.a).toEqual(1)
  expect(newFixture.a).toEqual(2)
})
