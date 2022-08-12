import type { ProjectConfig } from '#/config'
import { PROJ_CFG_KEY } from '@/enums/cacheEnum'
import projectSetting from '@/settings/projectSetting'
import { useAppStore } from '@/store/module/app'
import { deepMerge } from '@/utils'
import { Persistent } from '@/utils/cache/persistent'

export function initAppConfigStore() {
  const appStore = useAppStore()

  // 获取基础项目配置选项
  let _ProjectConfig: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig
  // 深度合并项目配置
  _ProjectConfig = deepMerge(projectSetting, _ProjectConfig || {})

  // 设置当前配置项
  appStore.setProjectConfig(_ProjectConfig)
}
