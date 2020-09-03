import path from 'path'
import { Compiler } from './Compiler'

const fixturesDirectory = path.join(__dirname, '__fixtures__')
const compiler = new Compiler(path.join(fixturesDirectory, 'test.js'), {
  target: fixturesDirectory,
  prefix: 'compiled',
})

try {
  compiler.compile()
} catch (error) {
  console.error(error)
}
