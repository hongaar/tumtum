import path from 'path'
import { Compiler } from './Compiler'

it('compiles', async () => {
  const fixturesDirectory = path.join(__dirname, '__fixtures__')
  const compiler = new Compiler(path.join(fixturesDirectory, 'test.js'), {
    target: path.join(fixturesDirectory, 'build'),
    prefix: 'compiled',
  })
  const out = await compiler.compile()

  expect(out).toEqual(path.join(fixturesDirectory, 'build', 'compiled.exe'))
})
