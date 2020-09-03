import { compile, NexeOptions } from 'nexe'
import path from 'path'
import webpack, { Configuration } from 'webpack'

type CompilerOptions = {
  target: string
  prefix?: string
  bundleOnly?: boolean
}

export class Compiler {
  private readonly NODE_VERSION = '12.14.1'

  public constructor(
    public binPath: string,
    public compilerOptions: CompilerOptions
  ) {}

  public async compile() {
    const bundleFilename = await this.bundle()
    if (this.compilerOptions.bundleOnly !== true) {
      return this.pack(bundleFilename)
    } else {
      return bundleFilename
    }
  }

  private async bundle() {
    const target = this.compilerOptions.target
    const debug = true
    const bundleName = `${this.compilerOptions.prefix}.js`
    const webpackConfig: Configuration = {
      mode: debug ? 'development' : 'production',
      entry: this.binPath,
      resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.node', '*'],
      },
      plugins: [
        // // To resolve error during bundling
        // new webpack.IgnorePlugin(/electron[/\\]?/),
        // // Ignore this file to exclude nexe and webpack from bundle
        // new webpack.IgnorePlugin(/\/Packer$/),
      ],
      target: 'node',
      node: {
        __filename: false,
        __dirname: false,
      },
      stats: 'verbose' as const,
      output: {
        filename: bundleName,
        path: target,
      },
    }

    return new Promise<string>((resolve, reject) => {
      webpack(webpackConfig, async (error, stats) => {
        // await writeJsonFile('webpack-stats.json', stats.toJson())

        if (error || stats.hasErrors()) {
          console.error(error, stats)
          return reject(new Error('Build failed'))
        }

        resolve(path.join(target, bundleName))
      })
    })
  }

  private async pack(bundleFilename: string) {
    const debug = true
    const packName = `${this.compilerOptions.prefix}.exe`
    const output = path.join(this.compilerOptions.target, packName)

    const nexeConfig: Partial<NexeOptions> = {
      input: bundleFilename,
      output,
      cwd: process.cwd(),
      // bundle: false,
      // resources: [],
      // loglevel: debug ? 'verbose' : 'silent',
      targets: [`windows-x64-${this.NODE_VERSION}`],
    }

    await compile(nexeConfig)

    return output
  }
}
