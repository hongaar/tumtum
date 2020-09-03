import { commands, Program } from '..'

const config = {}

const program = new Program(config)

program.add(commands.test)

program.run()
