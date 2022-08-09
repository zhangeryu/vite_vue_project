import { Ref, InjectionKey } from 'vue'
import { useContext, createContext } from '@/hooks/core/useContext'

export interface AppProviderContextProps {
  prefixCls: Ref<string>
  isMobile: Ref<boolean>
}
const key: InjectionKey<AppProviderContextProps> = Symbol()

export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key)
}

export const useAppProviderContext = () => {
  return useContext<AppProviderContextProps>(key)
}
