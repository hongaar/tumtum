import { cyan } from 'ansi-colors'
import { Command, Program as BaseProgram, program } from 'bandersnatch'
import sourceMapSupport from 'source-map-support'

export type ProgramConfig = {}

export class Program {
  public program: BaseProgram

  constructor(public config: ProgramConfig) {
    this.program = program({
      version: false,
      prompt: `tumtum ${cyan('$')} `,
    })
  }

  public add<T>(command: Command<T>) {
    return this.program.add(command)
  }

  public async run(command?: string | string[]) {
    this.init()

    const { onfulfilled, onrejected } = await this.initHandlers()

    // Run app
    return this.program.run(command).then(onfulfilled).catch(onrejected)
  }

  public init() {
    this.initExceptions()
    this.initContainer()
  }

  private initExceptions() {
    // Crash Node.js on unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      throw err
    })

    // Source map support
    sourceMapSupport.install({
      handleUncaughtExceptions: false,
    })
  }

  private initContainer() {
    // @todo
  }

  private async initHandlers() {
    // @todo

    return {
      onfulfilled: (resolved: unknown) => {
        console.log('Finished', resolved)
      },
      onrejected: async (error: any) => {
        console.error(error, error.stack && error.stack.split('\n'))

        if (!this.program.isRepl()) {
          process.exit(1)
        }
      },
    }
  }
}
