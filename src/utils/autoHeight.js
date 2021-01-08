/**
 * 固定搜索栏和分页：动态计算主内容高度
 */

function getOffsetHeight (object) {
  return object.offsetHeight || 0
}

export function calcFixedHeight (context, screen, main, header = 100, footer = 48) {
  let height = screen.offsetHeight - header - footer
  main.style.top = header + 'px'
  main.style.height = height + 'px'
  context.tableHeight = height
}

export function calcDynamicHeight (context, screen, main, header, footer) {
  let height = getOffsetHeight(screen) - getOffsetHeight(header) - getOffsetHeight(footer)
  main.style.top = getOffsetHeight(header) + 'px'
  main.style.height = height + 'px'
  context.tableHeight = height
}

export function emitResize (context, options = {}) {
  if (!context) return
  let method = options.type === 'fixed' ? calcFixedHeight : calcDynamicHeight
  let screen = options.screen || context.$el
  let main = options.main || screen.querySelector('.ips-content--fixed__main')
  let header = options.header || screen.querySelector('.ips-content--fixed__header') || {}
  let footer = options.footer || screen.querySelector('.ips-content--fixed__footer') || {}
  main && method(context, screen, main, header, footer)
  window.onresize = function () {
    method(context, screen, main, header, footer)
  }
}
