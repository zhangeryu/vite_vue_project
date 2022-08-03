import { ConfigEnv, UserConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { createProxy } from './build/vite/proxy'
import { wrapperEnv } from './build/utils'
import { OUTPUT_DIR } from './build/constant' // 打包出口文件名 dist
import { generateModifyVars } from './build/generate/generateModifyVars' // 随机生成颜色列表
import { createVitePlugins } from './build/vite/plugin' // plugin配置表

// process.cwd() 返回 Node.js 进程的当前工作目录
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd() // 先获取当前根目录
  const env = loadEnv(mode, root) // 获取当前根目录下的env文件
  const viteEnv = wrapperEnv(env) // 获取env环境变量参数值
  const { VITE_PROXY, VITE_PORT, VITE_DROP_CONSOLE } = viteEnv
  const isBuild = command === 'build'
  return {
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      open: true,
      https: false,
      // proxy: createProxy(VITE_PROXY),
    },
    build: {
      outDir: OUTPUT_DIR,
      // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000, // 规定触发警告的 chunk 大小。（以 kbs 为单位）
      /**
       * https://cn.vitejs.dev/config/build-options.html#build-minify
       * 当 minify = 'terser'时，则可以配置使用 terserOptions
       * minify => boolean | 'terser' | 'esbuild'  默认为esbuild, 比terser打包快 20-40倍，压缩率只差 1%-2%
       * 在使用terser时，需要先安装terser  yarn add terser -D
       */
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
    },
    resolve: {
      alias: [
        // import @/xxx => import src/xxx
        {
          find: /^@\//,
          replacement: pathResolve('src') + '/',
        },
        // import #/xxx => import types/xxx
        {
          find: /^#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    // 预构建依赖包
    optimizeDeps: {
      include: [
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'moment/dist/locale/zh-cn',
        'ant-design-vue/es/locale/en_US',
        'moment/dist/locale/eu',
      ],
    },
  }
}
