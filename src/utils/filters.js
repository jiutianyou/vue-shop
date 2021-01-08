// 过滤器函数
import moment from 'moment'
import { caseSourceList } from '@/datas/solidData'
/**
 * @description 时间戳转日期格式
 * @param time
 * @returns {*}
 */
export function parseTime (time) {
  if (time) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return ''
  }
}

/**
* @description 时间戳转年月
* @param time
* @returns {*}
*/
export function parseMonth (time) {
  if (time) {
    return moment(time).format('YYYY-MM')
  } else {
    return ''
  }
}

/**
 * @description 时间戳转日期格式，不带时分秒
 * @param time
 * @returns {*}
 */
export function parseDate (time) {
  if (time) {
    return moment(time).format('YYYY-MM-DD')
  } else {
    return ''
  }
}

export function formatTime (time, option) {
  if (arguments.length === 0) {
    return null
  }
  const format = option || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}
/**
 * @description 资产查询的一些时间格式转化 20190101  => 2019/01/01
 * @param time
 * @returns {*}
 */
export function queryAddTime (time) {
  if (time) {
    return time.substring(0, 4) + '-' + time.substring(4, 6) + '-' + time.substring(6, 8)
  } else {
    return ''
  }
}
/**
 * @description 资产查询的一些时间格式转化 2016/06/29 00:00:00  => 2016/06/09
 * @param time
 * @returns {*}
 */
export function queryDeleteTime (time) {
  if (time) {
    return time.substring(0, 4) + '-' + time.substring(5, 7) + '-' + time.substring(8, 10)
  } else {
    return ''
  }
}
export function parseValue (v) {
  if (v) {
    return v.split(',')[1]
  } else {
    return ''
  }
}
export function parseLinkman (v) {
  if (v) {
    const arr = v.map(v => v.linkmanName)
    return arr.join(',')
  } else {
    return ''
  }
}
export function parseTrade (v) {
  let trade = ''
  if (v) {
    const arr = JSON.parse(window.localStorage.getItem('companyTrade'))
    arr.forEach(element => {
      if (element.lookupItemKey === v) trade = element.lookupItemName
    })
  }
  return trade
}
export function formatTrade (v) {
  let arr = []
  let trade = ''
  if (v) {
    arr = v.split(',')
    trade = arr.length === 2 ? arr[0] : ''
  }
  return trade
}
export function getValueByKey (val, key, name, list) {
  if (val !== 0 && val !== '0' && !val) {
    return ''
  }
  let newName = ''
  list.forEach(item => {
    if (item[key] === val) {
      newName = item[name]
    }
  })
  return newName
}
export function parseCustomerClass (v) {
  let customerClass = ''
  if (v) {
    const arr = JSON.parse(window.localStorage.getItem('customerClass'))
    arr.forEach(element => {
      if (element.lookupItemKey === v) customerClass = element.lookupItemName
    })
  }
  return customerClass
}
export function parseGender (v) {
  let gender = ''
  if (v === '0') {
    gender = '男'
  }
  if (v === '1') {
    gender = '女'
  }
  return gender
}
/**
 * 超时时间配置
 * @export
 * @param number
 * @returns  string
 */
export function overtimeFilter (num) {
  let result
  if (num <= -1) {
    result = Math.floor(Math.abs(num))
    return '已超时' + result + '天'
  } else if (num > 0) {
    return Math.ceil(num).toString() + '天'
  } else {
    return '已超时0天'
  }
}

// 费用管理的缴费剩余天数转换
export function costOvertimeFilter (data) {
  let result
  // 已收款
  // if (data.payStatus === 0) { // 需求改变 2020/8/28 注释此代码
  //   return '--'
  // }
  // 审批节点过了：待补充缴费信息
  if (data.costStatus > 6) {
    return '--'
  }
  let num = data.leftTodoDays
  if (num <= -1) {
    result = Math.floor(Math.abs(num))
    return '已超时' + result + '天'
  } else if (num > 0) {
    return Math.ceil(num).toString() + '天'
  } else {
    return '已超时'
  }
}

/**
 *以下是立案模块的过滤函数
 *
 */
export function parseContractType (type) {
  let name = ''
  switch (type) { // 合同类型：0-标准合同-空白;1-标准合同-非空白;2-非标合同
    case 0:
      name = '标准合同-空白'
      break
    case 1:
      name = '标准合同-非空白'
      break
    case 2:
      name = '非标合同'
      break
    default:
      name = ''
  }
  return name
}
export function parseChangeType (type) {
  let name = ''
  switch (type) { // 合同类型：0-标准合同-空白;1-标准合同-非空白;2-非标合同
    case 0:
      name = '内部变更'
      break
    case 1:
      name = '外部变更'
      break
    case 2:
      name = '签约主体变更'
      break
    default:
      name = ''
  }
  return name
}
export function contractTypeP (type) {
  let name = ''
  switch (type) { // 合同类型（1-变更协议; 2-销售合同）
    case 1:
      name = '变更协议'
      break
    case 2:
      name = '销售合同'
      break
    default:
      name = ''
  }
  return name
}
export function caseProcessType (type) {
  let name = ''
  switch (type) { // 案件处理方案（0、不变 1、新增 2、修改 3、终止）
    case 0:
      name = '不变'
      break
    case 1:
      name = '新增'
      break
    case 2:
      name = '修改'
      break
    case 3:
      name = '终止'
      break
    default:
      name = ''
  }
  return name
}

export function parseprocessing (type) {
  let name = ''
  switch (type) { // 处理方案（0、平衡 1、客户补充打款 2、客户预存款）
    case 0:
      name = '平衡'
      break
    case 1:
      name = '客户补充打款'
      break
    case 2:
      name = '客户预存款'
      break
    default:
      name = ''
  }
  return name
}
export function parsefillingtype (type) {
  let name = ''
  switch (type) { // 立案申请类型0-销售合同立案 1-保密协议 2-框架合同 3-合同变更contractFilingType
    case 0:
      name = '销售合同立案'
      break
    case 1:
      name = '保密协议'
      break
    case 2:
      name = '框架合同'
      break
    case 3:
      name = '合同变更'
      break
    default:
      name = ''
  }
  return name
}
export function parseHas (type) {
  let name = ''
  switch (type) { // 类型：0-吴;1-有;2-未知
    case 1:
      name = '无'
      break
    case 0:
      name = '有'
      break
    case 2:
      name = '未知'
      break
    default:
      name = ''
  }
  return name
}
export function parseHave (type) {
  let name = ''
  switch (type) { // 类型：0-吴;1-有;2-未知
    case 1:
      name = '无'
      break
    case 0:
      name = '有'
      break
    case 2:
      name = '未提及'
      break
    default:
      name = ''
  }
  return name
}
export function parseContentHave (type) {
  let name = ''
  switch (type) { // 类型：0-吴;1-有;2-未知
    case 1:
      name = '是'
      break
    case 0:
      name = '否'
      break
    default:
      name = '未知'
  }
  return name
}
export function parseCROther (type) {
  let name = ''
  switch (type) { // 类型：0-无源码;1-有源码;2-未知;
    case 1:
      name = '有源码'
      break
    case 2:
      name = '未知'
      break
    case 0:
      name = '无源码'
      break
    default:
      name = '其他'
  }
  return name
}
export function parseProjectType (type) {
  let name = ''
  switch (type) { // 类型：1-补助类;2-管理认证类;3-高新类
    case 1:
      name = '补助类'
      break
    case 2:
      name = '管理认证类'
      break
    case 3:
      name = '高新类'
      break
    default:
      name = '其他'
  }
  return name
}
/**
 * @description 立案流程时间格式化
 * @param time
 * @returns {*}
 */
export function parseFilingFlowTime (time) {
  if (time) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return '待操作'
  }
}
/**
 * 客户标签格式化
 */
export function parseCustomerTag (v) {
  if (!v || v.length < 1) {
    return ''
  }
  let value = []
  v.forEach(item => {
    value.push(item.displayName)
  })
  return value.join(', ')
}
export function formatGender (v) {
  let list = ['男', '女']
  return list[v]
}
export function parseCustLink (code) {
  return `${location.origin}/#/customerinfoshare?customerCode=${code}`
}
// 地址
export function parseAddress (row) {
  return `${row.province.name || ''}${row.city.name || ''}${row.county.name || ''}${row.specificAddress || ''}`
}

export function isGoOtherAgencyFilter (val) {
  return ['是', '否'][val]
}

export function caseSourceFilter (id) {
  id = id + ''
  for (let k of caseSourceList) {
    if (k.id === id) {
      return k.name
    }
  }
}
