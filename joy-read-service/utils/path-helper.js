import { fileURLToPath } from 'url'
import path from 'path'

export const getDriname = (importMetaUrl) => {
  return path.dirname(fileURLToPath(importMetaUrl))
}