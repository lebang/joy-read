import * as Comlink from 'comlink'

export default async function () {
  const processor = Comlink.wrap(
    new Worker(new URL('./worker.js', import.meta.url), { type: 'module' }),
  )

  await processor.inc(6)
  const counter = await processor.counter
  console.log('counter:', counter)
}
