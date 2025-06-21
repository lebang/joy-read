// storage.js
const TEST_KEY = '__test__';

// 检测存储是否可用
export function isStorageAvailable(storageType) {
  try {
    storageType.setItem(TEST_KEY, TEST_KEY);
    storageType.removeItem(TEST_KEY);
    return true;
  } catch {
    return false;
  }
}

// 内存存储实现
export class MemoryStorage {
  constructor() {
    this.store = Object.create(null);
  }

  getItem(key) {
    return this.store[key] ?? null;
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  removeItem(key) {
    delete this.store[key];
  }
}

// 获取最佳存储实现
export function getBestStorage() {
  if (typeof window === 'undefined') {
    return new MemoryStorage();
  }

  if (isStorageAvailable(window.localStorage)) {
    return window.localStorage;
  }
  if (isStorageAvailable(window.sessionStorage)) {
    return window.sessionStorage;
  }

  return new MemoryStorage();
}

// 存储工具函数
export const StorageUtils = {
  isStorageAvailable,
  MemoryStorage,
  getBestStorage
};