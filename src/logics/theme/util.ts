// 插入样式
const docEle = document.documentElement

export function setCssVar(prop: string, val: any, dom = docEle) {
  dom.style.setProperty(prop, val)
}
