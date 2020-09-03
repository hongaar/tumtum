import { Program } from '../../../app/lib'
import { command } from 'bandersnatch'

const config = {}

const program = new Program(config)

const test = command('test').action(() => 'test')

program.add(test)

program.run()
