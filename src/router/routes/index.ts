import type { AppRouteRecordRaw, AppRouteModule } from '../types'

import { PageEnum } from '@/enums/pageEnum'

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  name: 'Root',
  path: '/',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
}

// 登录路由
export const LoginRoute: AppRouteRecordRaw = {
  name: 'Login',
  path: '/login',
  component: () => import('@/views/system/login/Login.vue'),
  meta: { title: '登录' },
}

export const basicRoutes = [LoginRoute, RootRoute]
