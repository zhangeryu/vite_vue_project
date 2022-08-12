import {
  TOKEN_KEY,
  USER_INFO_KEY,
  ROLES_KEY,
  LOCK_INFO_KEY,
  PROJ_CFG_KEY,
  MULTIPLE_TABS_KEY,
} from '@/enums/cacheEnum'

import type { RouteLocationNormalized } from 'vue-router'
import type { ProjectConfig } from '#/config'
import type { LockInfo, UserInfo } from '#/store'
import { DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting'
import { Memory } from '@/utils/cache/memory'

// 基础存储接口
interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined
  [USER_INFO_KEY]: UserInfo
  [ROLES_KEY]: string[]
  [LOCK_INFO_KEY]: LockInfo
  [PROJ_CFG_KEY]: ProjectConfig
  [MULTIPLE_TABS_KEY]: RouteLocationNormalized[]
}

// LocalStore存储接口
type LocalStore = BasicStore

// LocalStore存储接口Key
type LocalKeys = keyof LocalStore

// 创建本地内存
const localMemory = new Memory(DEFAULT_CACHE_TIME)

// 导出一个持久化类，这里面的方法都是静态的
export class Persistent {
  // 获取LocalStorage的内存
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>
  }
}
