import { command, program } from 'bandersnatch'

export default program().default(
  command('hello').action(() => {
    console.log('Hello, world!')
  })
)
