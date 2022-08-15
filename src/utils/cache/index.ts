import { CreateStorageParams, createStorage as create } from './storageCache'
import { enableStorageEncryption } from '@/settings/encryptionSetting'
import { getStorageShortName } from '@/utils/env'
import { DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting'

export type Options = Partial<CreateStorageParams>

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  }
}

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options))
}

// 创建本地缓存
export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}
