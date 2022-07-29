import type { ProxyOptions } from 'vite'

// 定义代理地址参数数组，[0] => 需要被代理的地址, [1] => 代理指向的地址
type ProxyItem = [string, string]

// 定义方法接受参数配置
type ProxyList = ProxyItem[]

// 定义vite代理所接收的对象类型
type ProxyTargetListOptions = Record<string, string | ProxyOptions>

// 验证地址是否是以https开头
function httpsRgex(url: string | any) {
  const httpsRe = /^https\/\//
  return httpsRe.test(url)
}

/**
 * 生成vite代理配置
 */
export function createProxy(list: ProxyList[]) {
  const retOptions: ProxyTargetListOptions = {}
  for (const [prefix, target] of list) {
    // @ts-ignore
    retOptions[prefix] = {
      target,
      changeOrigin: true,
      // 重写地址, 结合环境变量地址来配置，一般情况不需要做任何修改
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https的请求，则设置为false
      ...(httpsRgex(target) ? { source: false } : {}),
    }
  }
  return retOptions
}
