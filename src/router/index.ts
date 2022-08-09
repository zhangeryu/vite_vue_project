import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './routes/index' // 基础路由

// 白名单列表
const whiteRoutes: string[] = []

// 获取所有基础路由的名称并加入到白名单中
function getRouteNames(route: any[]) {
  route.forEach((item) => {
    whiteRoutes.push(item.name)
    getRouteNames(item.children || [])
  })
}
getRouteNames(basicRoutes)

export const router = createRouter({
  // 路由模式,当前为hash模式
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  // 路由表
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为false
  strict: true,
  // 导航时控制滚动的函数
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
