import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    console.log('Executou')

    return {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      teardown() {},
    }
  },
}
