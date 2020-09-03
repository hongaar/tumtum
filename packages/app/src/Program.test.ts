import { command } from 'bandersnatch'
import { Program } from './Program'

it('runs', async () => {
  const program = new Program({}).add(command('test').action(() => 42))

  expect(program.run('test')).resolves.toEqual(42)
})
