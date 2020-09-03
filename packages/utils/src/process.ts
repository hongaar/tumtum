// @todo container
import childProcess, { ChildProcess, SpawnOptions } from 'child_process'
import crossSpawn from 'cross-spawn'
import util from 'util'
// import { container } from '../container'

const childProcessExec = util.promisify(childProcess.exec)

export class SpawnError extends Error {
  constructor(
    message: string,
    public subprocess: ChildProcess,
    public code: number | null,
    public stdout: string,
    public stderr: string
  ) {
    super(message)
  }
}

/**
 * Execute a command in a shell, returns its output.
 * "Spawns a shell then executes the command within that shell, buffering any
 * generated output. The command string passed to the exec function is processed
 * directly by the shell and special characters (vary based on shell) need to be
 * dealt with accordingly."
 */
export async function exec(cmd: string, cwd: string = process.cwd()) {
  // const logger = await container.get('logger')

  // logger.trace(`Executing command "${cmd}" in "${cwd}"`)

  try {
    const { stdout } = await childProcessExec(cmd, { cwd })

    return stdout.trim()
  } catch (err) {
    const { stdout, stderr, child } = err

    // logger.error(`Error encountered while executing command`, {
    //   stdout,
    //   stderr,
    //   child,
    // })

    throw err
  }
}

/**
 * Execute a command directly, returns the child process instance.
 * "The child_process.spawn() method spawns a new process using the given
 * command, with command line arguments in args."
 */
export async function spawn(
  cmd: string,
  args: string[] = [],
  cwd: string = process.cwd(),
  options: SpawnOptions = {}
) {
  // const logger = await container.get('logger')

  // logger.trace(
  //   `Spawning command "${cmd}" with arguments "${args.join()}" in "${cwd}"`
  // )

  const subprocess = crossSpawn(cmd, args, { cwd, ...options })

  return new Promise<{
    subprocess: ChildProcess
    stdout: string
    stderr: string
  }>((resolve, reject) => {
    let stdout = ''
    let stderr = ''

    subprocess.on('error', function (error: any) {
      // logger.error(`Error encountered while spawning command`, {
      //   error,
      //   subprocess,
      // })
      reject(new Error(`Error encountered while spawning command "${cmd}"`))
    })

    subprocess.stdout?.on('data', (data: any) => (stdout += String(data)))
    subprocess.stderr?.on('data', (data: any) => (stderr += String(data)))

    subprocess.on('exit', function (code: any) {
      if (code !== 0) {
        // logger.error(`Command exited with non-zero status`, {
        //   code,
        //   stdout: stdout.trim(),
        //   stderr: stderr.trim(),
        // })
        reject(
          new SpawnError(
            `Command "${cmd}" exited with non-zero status`,
            subprocess,
            code,
            stdout.trim(),
            stderr.trim()
          )
        )
      } else {
        resolve({
          subprocess,
          stdout: stdout.trim(),
          stderr: stderr.trim(),
        })
      }
    })
  })
}

/**
 * Open a file with the OS default program.
 */
export async function openFile(path: string) {
  function getCommandLine() {
    switch (process.platform) {
      case 'darwin':
        return 'open'
      case 'win32':
        return 'start ""'
      default:
        return 'xdg-open'
    }
  }

  await exec(`${getCommandLine()} "${path}"`)
}
