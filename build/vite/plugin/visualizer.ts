// 生成依赖收集报告
import visualizer from 'rollup-plugin-visualizer'
import { Plugin } from 'vite'
import { isReportMode } from '../../utils'

export function configVisualize() {
  if (isReportMode()) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as Plugin
  }
  return []
}
