import { ModuleNode, ViteDevServer } from "vite"
import { generateIndex } from "../src/utils/generate-index"
import Debug from 'debug'

const debug = Debug('vite-plugin-index-blog')
const MODULE_ID_VIRTUAL = '/@vite-plugin-index-blog/blog-list'

export default function indexBlog () {
  return {
    name: 'vite-plugin-index-blog',
    enforce: 'pre',
    resolveId(id: string) {
      if (id === '~blogs') {
        return `/@vite-plugin-index-blog/blog-list`
      }
      return null
    },
    load(id: string) {
      if (id.startsWith(MODULE_ID_VIRTUAL)) {
        return {
          code: `export default ${JSON.stringify(generateIndex())}`,
          map: null
        }
      }
      return null
    },
    configureServer(server: ViteDevServer) {
      const watcher = server.watcher
      const slash = (str: string) => str.replace(/\\/g, '/')

      const regenerateIfNeeded = (path: string) => {
        path = slash(path)
        if (!path.includes('/blogs/')) {
          return
        }
        regenerate()
      }

      const invalidatePagesModule = () => {
        const { moduleGraph } = server
        const mods = moduleGraph.getModulesByFile(MODULE_ID_VIRTUAL)
        if (mods) {
          const seen = new Set<ModuleNode>()
          mods.forEach((mod) => {
            moduleGraph.invalidateModule(mod, seen)
          })
        }
      }

      const regenerate = () => {
        invalidatePagesModule()
        debug('Reload generated blogs.')
        server.ws.send({
          type: 'full-reload',
        })
      }

      watcher.on('unlink', regenerateIfNeeded)
      watcher.on('add', regenerateIfNeeded)
      watcher.on('change', regenerateIfNeeded)
    }
  }
}
