import * as assert from 'assert'
import * as fs from 'fs'
import * as path from 'path'
import * as fg from 'fast-glob'
import { Compiler } from 'webpack'
import { generateRoutes, GenerateConfig } from 'vue-macula-route-generator'

const pluginName = 'VueMaculaAutoRoutingPlugin'

interface Options extends GenerateConfig {}

namespace VueMaculaAutoRoutingPlugin {
  export type MaculaAutoRoutingOptions = Options
}

class VueMaculaAutoRoutingPlugin {
  constructor(private options: Options) {
    assert(options.pages, '`pages` is required')
  }

  apply(compiler: Compiler) {
    const generate = () => {
      // 寻找pages下面模块目录，循环处理各模块路由
      const patterns = ['*/*.js', '!**/__*__.js', '!**/__*__/**']

      const pagePaths = fg.sync<string>(patterns, {
        cwd: this.options.pages
      })

      const origPages = this.options.pages
      pagePaths.forEach(page => {
        this.options.moduleName = page.split('/')[0]
        this.options.pages = path.join(origPages, this.options.moduleName, 'views')
        this.options.importPrefix = path.join('@/modules', this.options.moduleName, 'views/')
        const code = generateRoutes(this.options)
        const to = path.resolve(__dirname, '../../../src/modules', page.split('/')[0], 'router/routes.js');
  
        if (
          fs.existsSync(to) &&
          fs.readFileSync(to, 'utf8').trim() === code.trim()
        ) {
          return
        }
  
        fs.writeFileSync(to, code)
      })
    }

    compiler.hooks.run.tap(pluginName, generate)
    compiler.hooks.watchRun.tap(pluginName, generate)
  }
}

export = VueMaculaAutoRoutingPlugin
