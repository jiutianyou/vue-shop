import * as moment from 'moment'
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}
// 工具类

// 去除表单查询空格
export function trimForm (form) {
  if (form && typeof form === 'object') {
    for (let k in form) {
      if (form[k] && typeof form[k] === 'string') {
        form[k] = form[k].trim()
      }
    }
  }
}
/**
 * forEach for object
 */
export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isUndef (v) {
  return v === undefined || v === null
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPromise (val) {
  return val && typeof val.then === 'function'
}

export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

export function parseDateObject (date) {
  return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : ''
}

export function parseToDateString (date) {
  return date ? moment(date).format('YYYY-MM-DD') : ''
}

export function parseEndTimeString (date) {
  return date ? moment(date).format('YYYY-MM-DD') + ' 23:59:59' : '1'
}
export function parseMonth (time) {
  if (time) {
    return moment(time).format('YYYY年MM月份')
  } else {
    return ''
  }
}
export function isEmptyObj (obj) {
  if (typeof obj !== 'object') {
    return false
  }
  for (var name in obj) {
    return false
  }
  return true
}
export function isEmpty (v) {
  return isUndef(v) || isEmptyObj(v) || v === ''
}
/**
 * @description 日期格式转换函数
 * @param time
 * @param cFormat
 * @returns {*}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if (!time) {
    return ''
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
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
 * @description 日期格式化
 * @param time
 * @param option
 * @returns {*}
 */
export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @description 将URL中的请求参数转换成Object
 * @param url
 * @returns {{}}
 */
export function getQueryObject (url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @description 获取字符串长度，非单字节的字符长度+1，其他长度+0.5
 * @param str
 * @returns {number}
 */
// export function getStrLength (str) {
//   let len = 0
//   for (let i = 0; i < str.length; i++) {
//     if (str[i].match(/[^\x00-\xff]/gi) != null) {
//       len += 1
//     } else {
//       len += 0.5
//     }
//   }
//   return Math.floor(len)
// }

/**
 * @description 清理数组中的空元素，返回新数组
 * @param originalArr
 * @returns {Array}
 */
export function cleanArray (originalArr) {
  const newArray = []
  for (let i = 0; i < originalArr.length; i++) {
    if (originalArr[i]) {
      newArray.push(originalArr[i])
    }
  }
  return newArray
}

/**
 * @description json对象转换成字符串
 * @param json
 * @returns {*}
 */
export function param (json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @description 将URL中的参数转换成对象
 * @param url
 * @returns {{}}
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

export function html2Text (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * @description 合并对象
 * @param target
 * @param source
 * @returns {*}
 */
export function objectMerge (target, source) {
  /* Merges two  objects,
   giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const sourceProperty = source[property]
      if (typeof sourceProperty === 'object') {
        target[property] = objectMerge(target[property], sourceProperty)
        continue
      }
      target[property] = sourceProperty
    }
  }
  return target
}

/**
 * @description 滚动对象到指定位置
 * @param element
 * @param to
 * @param duration
 */
export function scrollTo (element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

/**
 * @description 切换样式
 * @param element
 * @param className
 */
export function toggleClass (element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

// 时间间隔快捷选择选项
export const pickerOptions = [
  {
    text: '今天',
    onClick (picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime() + 3600 * 1000 * 24 - 1000)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一周',
    onClick (picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一个月',
    onClick (picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近三个月',
    onClick (picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

// 时间间隔快捷选择选项
export const pickerOptionsEnd = [
  {
    text: '今天',
    onClick (picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime() + 3600 * 1000 * 24 - 1000)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '有效一周',
    onClick (picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '有效一个月',
    onClick (picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '有效三个月',
    onClick (picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

// 日期快捷选择选项
export const singleDayPickerOptions = {
  disabledDate (time) {
    return time.getTime() > Date.now()
  },
  shortcuts: [
    {
      text: '今天',
      onClick (picker) {
        const end = new Date()
        const start = new Date(new Date().toDateString())
        end.setTime(start.getTime() + 3600 * 1000 * 24 - 1000)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '昨天',
      onClick (picker) {
        const end = new Date()
        const start = new Date(new Date().toDateString())
        start.setTime(start.getTime() - 3600 * 1000 * 24)
        end.setTime(end.getTime() - 3600 * 1000 * 24)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近7天',
      onClick (picker) {
        const end = new Date(new Date().toDateString())
        const start = new Date()
        start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近30天',
      onClick (picker) {
        const end = new Date(new Date().toDateString())
        const start = new Date()
        start.setTime(end.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    }
  ]
}

export function getTime (type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 深度拷贝
 * @param source
 * @returns {*}
 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

/**
 * Object 转 FormData
 * @param obj
 * @returns {*}
 */
export function objToFormData (obj) {
  var formData = new FormData()
  for (var index in obj) {
    if (
      obj.hasOwnProperty(index) &&
      !isUndef(obj[index]) &&
      !isObject(obj[index])
    ) {
      formData.append(index, obj[index])
    }
  }
  return formData
}

/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {Array} arr 数组
 * @param {Array} value 元素值
 */
export function isInArray (arr, value) {
  if (arr.length === 0) return false
  for (var i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      return true
    }
  }
  return false
}

/*
 * 获取一个数组(arr1)的元素在另一个数组(arr2)里不存在的元素综合
 * return array
 */
export function getSurplusElements (arr1, arr2) {
  var arr = []
  for (var i = 0; i < arr2.length; i++) {
    if (!isInArray(arr1, arr2[i])) {
      arr.push(arr2[i])
    }
  }
  return arr
}

/*
 * 检测一个数组(arr1)的元素是否在另一个数组(arr2)里存在
 * 只要有一个存在返回true 否返回false
 */
export function hasContainElement (arr1, arr2) {
  var isExist = false
  for (var i = 0; i < arr1.length; i++) {
    if (isInArray(arr2, arr1[i])) {
      isExist = true
      break
    }
  }
  return isExist
}

/**
 * 数组去重
 * @param arr
 * returns {Array}
 */
export function filterArrayRepeat (arr) {
  var res = []
  var json = {}
  for (var i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i])
      json[arr[i]] = 1
    }
  }
  return res
}

/*
** getWorld 产生任意长度随机字母数字组合
** @getFlag 是否任意长度
** @min 任意最小长度（固定位数）
** @max-任意最大长度
*/
export function getWord (getFlag, min, max) {
  let str = ''
  let range = min
  let arr = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]
  if (getFlag) {
    range = parseInt(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < range; i++) {
    let index = parseInt(Math.random() * (arr.length - 1))
    str += arr[index]
  }
  return str
}
export function getRandom (getFlag, min, max) {
  let str = ''
  let range = min
  let arr = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]
  if (getFlag) {
    range = parseInt(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < range; i++) {
    let index = parseInt(Math.random() * (arr.length - 1))
    str += arr[index]
  }
  return str
}
export function filterNull (object) {
  for (var i in object) {
    var value = object[i]
    if (typeof value === 'object') {
      filterNull(value)
      if (isEmptyFn(value)) {
        object[i] = ''
      }
    } else {
      if (
        value === null ||
        value === undefined ||
        value === 'undefined' ||
        value === 'null'
      ) {
        object[i] = ''
      } else {
      }
    }
  }
  return object
}
function isEmptyFn (object) {
  if (Array.isArray(object)) {
    return false
  }
  for (var name in object) {
    return false
  }
  return true
}
/**
 * 去除json中的空值
 * @export
 * @param {any} object
 */
export function deleteEmptyProperty (object) {
  for (var i in object) {
    var value = object[i]
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          delete object[i]
          continue
        }
      }

      deleteEmptyProperty(value)

      if (isdeleteEmpty(value)) {
        delete object[i]
      }
    } else {
      if (value === '' || value === null || value === undefined) {
        delete object[i]
      } else {
      }
    }
  }
}
function isdeleteEmpty (object) {
  for (var name in object) {
    return false
  }
  return true
}

/**
 *
 * @param {*} arr or Obj
 * @param {*} id
 * @param {*} key
 */
export function findValueById (arr, id, key, idkey = 'id') {
  let keyValue
  for (let v of arr) {
    if (v[idkey] === id) {
      keyValue = v[key]
      break
    }
  }
  return keyValue
}
/**
 * 截取字符串方法
 * @param {*} longString
 * @param {*} startStr
 * @param {*} position 截取位置
 * @param {*} endtStr
 */
export function subStrAfter (longString, startStr, position = 'after', endStr) {
  let regStrObj = {
    after: `${startStr}(\\S*)`,
    before: `(\\S*)${startStr}`,
    between: `${startStr}(\\S*)${endStr}`
  }
  let result = longString.match(regStrObj[position])[1]
  return result
}

/**
 * 深度拷贝, 如果不是obj返回原来数据
 * @param source
 * @returns {*}
 */
export function copyAll (source) {
  if (!source && typeof source !== 'object') {
    return source
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}
// 获取文件的名称和路径
export function getFileName (arr) {
  if (!(Array.isArray(arr))) return false
  let fileNameArr = []
  arr.forEach((item, i) => {
    let tempArr = (item + '').split('/')
    fileNameArr.push({ name: tempArr[tempArr.length - 1], url: item })
  })
  return fileNameArr
}

// 获取专利类型
export function getPatentTypeName (str) {
  let name = ''
  const patentTypeList = [{ name: '发明', id: 3 }, { name: '实用新型', id: 2 }, { name: '外观', id: 1 }]
  patentTypeList.forEach((list) => {
    if (list.id === (str - 0)) {
      name = list.name
    }
  })
  return name
}
// 获取项目管理其他条件
export function getProjecOtherName (val) {
  // let tempArr = []
  // if (val.indexOf(0) >= 0) {
  //   tempArr.push('技术创新')
  // } else if (val.indexOf(1) >= 0) {
  //   tempArr.push('高新技术企业')
  // } else if (val.indexOf(2) >= 0) {
  //   tempArr.push('授权发明专利')
  // } else if (val.indexOf(3) >= 0) {
  //   tempArr.push('建立研发专账')
  // } else if (val.indexOf(4) >= 0) {
  //   tempArr.push('出口')
  // } else if (val.indexOf(5) >= 0) {
  //   tempArr.push('人才优势')
  // }
  // return tempArr.join(',')
  if (!val || val.length < 1) return
  let tempArr = [
    { key: '0', value: '技术创新' },
    { key: '1', value: '高新技术企业' },
    { key: '2', value: '授权发明专利' },
    { key: '3', value: '建立研发专账' },
    { key: '4', value: '出口' },
    { key: '5', value: '人才优势' }
  ]
  let valArr = val.split(',')
  let nameArr = []
  tempArr.forEach((item) => {
    valArr.forEach((list) => {
      if (item.key === list) {
        nameArr.push(item.value)
      }
    })
  })
  return nameArr.join(',')
}
// 去掉所有的html标记
export function delHtmlTag (str) {
  return str.replace(/<[^>]+>/g, '')
}
// 去掉除去br所有的html标记
export function delHtml (str) {
  // return str.replace(/<(?!img).*?>/g, '')
  // return str.replace(/(\s+)?<br(\s+)?\/?>(\s+)?/gi, '').replace(/<\/?p[^>]*>/gi, '')
  return str.replace(/(\s+)?<br(\s+)?\/?>(\s+)?/gi, '')
  // return str
}
// 去掉除去br和p所有的html标记
// export function delHtml (str) {
//   // return str.replace(/<(?!img).*?>/g, '')
//   return str.replace(/(\s+)?<br(\s+)?\/?>(\s+)?/gi, '').replace(/<\/?p[^>]*>/gi, '')
//   // return str
// }
/**
 * @description 去掉空格
 * @param str
 * @returns {boolean}
 */
export function removeSpace (str) {
  let strSp = str.replace(/\s+/g, '')
  return strSp
}
// 两个对象比较
export function compareDeepObj (source, target) {
  if (!source || !target || typeof source !== 'object' || typeof target !== 'object') {
    return false
  }
  for (let k in source) {
    if (typeof source[k] === 'object' && typeof target[k] === 'object') {
      compareDeepObj(source[k], target[k])
    } else if ((typeof source[k] === 'object' && typeof target[k] !== 'object') || (typeof source[k] !== 'object' && typeof target[k] === 'object')) {
      return true
    } else {
      if (source[k] !== target[k]) {
        return true
      }
    }
  }
  return false
}

export function isEmptyArray (arr) {
  if (!Array.isArray(arr)) return
  return arr.length === 0
}

export function clone (target) {
  return JSON.parse(JSON.stringify(target))
}

export function isEqual (obj, another) {
  return JSON.stringify(obj) === JSON.stringify(another)
}

/**
 *
 * @param { string } path  当前页面path
 * 获取当前页面的每页容量 size
 */
export function getCurrentPageSize (path) {
  let size = 10
  var userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    var account = JSON.parse(userInfo).account
    size = localStorage.getItem(`${account}${path}`) || 10
  }
  return parseInt(size)
}

/**
 *
 * @param { string } path  当前页面path
 * 设置当前页面的每页容量 size
 */
export function setCurrentPageSize (path, size) {
  var userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    var account = JSON.parse(userInfo).account
    localStorage.setItem(`${account}${path}`, size)
  }
}

// 判断字符串是否为JSON
export function isJSON (str) {
  if (typeof str === 'string') {
    try {
      let result = JSON.parse(str)
      return (typeof result === 'object')
    } catch (err) {
      return false
    }
  }
}

export function commonExportFlow (res, nameTitle, afterType) {
  afterType = afterType || '.xls'
  if (res.status === 200) {
    var link = document.createElement('a')
    link.target = '_black'
    let blob = new Blob([res.data], { type: 'application/vnd.xlsx;charset:utf-8' })
    let downloadUrl = window.URL.createObjectURL(blob)
    link.setAttribute('href', downloadUrl)
    let tempName = ''
    if (res.headers['content-disposition']) {
      tempName = res.headers['content-disposition'] && res.headers['content-disposition'].split(';')[1]
      tempName = tempName && tempName.split('=')[1]
      tempName = decodeURIComponent(tempName)
      tempName = tempName && tempName.replace(/\?/g, '')
      tempName = nameTitle + tempName
    } else {
      tempName = `${nameTitle}${moment(Date.now()).format('YYYYMMDDHHmmss')}${afterType}`
    }
    link.setAttribute('download', tempName)
    document.body.appendChild(link) // 添加到页面中，为兼容Firefox浏览器
    link.click()
    document.body.removeChild(link) // 从页面移除
  } else {
    this.$message.error('导出失败')
  }
}

// 异步流下载
export function commonDownLoadFlow (res, nameTitle) {
  if (res.status === 200) {
    let blob = new Blob([res.data], { type: 'application/vnd.xlsx;charset:utf-8' })
    let downloadUrl = window.URL.createObjectURL(blob)
    var link = document.createElement('a')
    link.target = '_black'
    link.setAttribute('href', downloadUrl)
    let tempName = ''
    if (res.headers['content-disposition']) {
      tempName = res.headers['content-disposition'] && res.headers['content-disposition'].split(';')[1]
      tempName = tempName && tempName.split('=')[1]
      tempName = decodeURIComponent(tempName)
    } else {
      tempName = `${nameTitle}_${moment(Date.now()).format('YYYYMMDDHHmmss')}.sls`
    }
    link.setAttribute('download', tempName)
    document.body.appendChild(link) // 添加到页面中，为兼容Firefox浏览器
    link.click()
    document.body.removeChild(link) // 从页面移除
  } else {
    this.$message.error('下载失败')
  }
}

// 非对象
export function isNotObject (value) {
  return typeof value !== 'object' || Array.isArray(value)
}

// 平铺对象
export function flatObject (object, target) {
  for (let prop in object) {
    if (isNotObject(object[prop])) {
      target[prop] = object[prop]
    } else {
      flatObject(object[prop], target)
    }
  }
}

// 查找目标对象中所列出的在对象为空的属性，没有则返回undefined
export function findTargetEmptyProperty (origin, target) {
  for (let prop in target) {
    if (!origin.hasOwnProperty(prop)) {
      continue
    }
    let value = origin[prop]
    if (value === '') {
      return prop
    }
  }
}
// 合并对象已存在的属性
export function assignExistProp (origin, target) {
  if (!isObject(origin) || !isObject(target)) return
  for (let key of Object.keys(origin)) {
    if (typeof origin[key] === 'object') {
      if (target[key]) {
        if (Array.isArray(origin[key])) {
          origin[key] = target[key].slice(0)
        } else {
          origin[key] = Object.assign(origin[key], target[key])
        }
      }
    } else {
      if (target.hasOwnProperty(key)) {
        origin[key] = target[key]
      }
    }
  }
}

// 去除参数中的无效值
export function deleteInvalidProperty (object) {
  for (var i in object) {
    var value = object[i]
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          delete object[i]
          continue
        }
      }

      deleteInvalidProperty(value)

      if (isdeleteEmpty(value)) {
        delete object[i]
      }
    } else {
      if (value === null || value === undefined) {
        delete object[i]
      } else {
      }
    }
  }
}

// 检验数据
export function verifyData (oData, nData) {
  let status = true
  if (oData instanceof Array && nData instanceof Array) {
    for (let i = 0; i < nData.length; i++) {
      if (oData[i] instanceof Object && nData[i] instanceof Object) {
        let status = verifyData(oData[i], nData[i])
        if (!status) return false
      } else if (oData[i] instanceof Array && nData[i] instanceof Array) {
        let status = verifyData(oData[i], nData[i])
        if (!status) return false
      } else {
        status = oData[i] === nData[i]
        if (!status) return false
      }
    }
  } else if (oData instanceof Object && nData instanceof Object) {
    for (let keys in nData) {
      if (oData[keys] instanceof Array && nData[keys] instanceof Array) {
        let status = verifyData(oData[keys], nData[keys])
        if (!status) return false
      } else if (oData[keys] instanceof Object && nData[keys] instanceof Object) {
        let status = verifyData(oData[keys], nData[keys])
        if (!status) return false
      } else {
        status = oData[keys] === nData[keys]
        if (!status) return false
      }
    }
  } else {
    status = oData === nData
  }
  return status
}

export function getType (value) {
  if (Array.isArray(value)) return 'array'
  return typeof value
}

export function resetObjectProp (object) {
  if (isEmptyObj(object)) return
  for (let key of Object.keys(object)) {
    let type = getType(object[key])
    if (type === 'string' || type === 'undefined') {
      object[key] = ''
    }
    if (type === 'number') {
      object[key] = undefined
    }
    if (type === 'object') {
      object[key] = {}
    }
    if (type === 'array') {
      object[key] = []
    }
  }
}

// 返回当前登录用户信息
export function getLoginUserInfo () {
  let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
  return userInfo
}

export function gatWayUploadApi () {
  return process.env.NODE_ENV === 'production' ? `${process.env.VUE_APP_API}/framework/file/create` : 'https://ips-gateway-sit.qizhidao.com/framework/file/create'
}

// 根据办事处返回名称
export function parseCodeToName (code, data, id, name, multiple) {
  if (!code) {
    return ''
  }
  data = Array.isArray(data) ? data : []
  // 多个办事处
  if (multiple) {
    let names = data.map(item => {
      if (code.includes(item[id])) {
        return item[name]
      }
    })
    return names.join()
  } else {
    // 单个办事处
    for (let item of data) {
      if (code === item[id]) {
        return item[name]
      }
    }
    return code
  }
}

// 验证表单字段必填
export function validateFormField (params = {}, data = {}) {
  for (let k in params) {
    if (!data[k] && data[k] !== 0) {
      return params[k] ? `${params[k]}必填` : '必填'
    }
  }
  return ''
}

// 去除'' null, undefine []等值
export function filterEffectValue (params = {}) {
  let res = {}
  for (let k in params) {
    if (params[k] || params[k] === 0) {
      if (Array.isArray(params[k])) {
        if (params[k].length) {
          res[k] = params[k]
        }
      } else {
        if (typeof params[k] === 'string') {
          params[k] = params[k].trim()
        }
        res[k] = params[k]
      }
    }
  }
  return res
}

// 表单必填默认值数据处理
export function formDefaultFun (data, fields = [], isAryFields = []) {
  fields = Array.isArray(fields) ? fields : [fields]
  for (let field of fields) {
    if (!data[field] && data[field] !== 0) {
      data[field] = ''
    }
  }
  // 处理默认数组的值
  isAryFields = Array.isArray(isAryFields) ? isAryFields : [isAryFields]
  for (let key of isAryFields) {
    if (data[key]) {
      data[key] = data[key].split(',')
    } else {
      data[key] = []
    }
  }
  return data
}

// 验证11位数字手机号码
export function validatePhone (value) {
  let reg = /^1\d{10}$/
  if (value && reg.test(value)) {
    return ''
  } else {
    return '请输入11位数字号码'
  }
}
// detectZoom 函数的返回值如果是 100 就是默认缩放级别，大于 100 则是放大了，小于 100 则是缩小了。
export function detectZoom () {
  var ratio = 0
  let screen = window.screen
  let ua = navigator.userAgent.toLowerCase()
  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI
    }
  } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth
  }
  if (ratio) {
    ratio = Math.round(ratio * 100)
  }
  return ratio
}

let resizeGobleFields = []
function cachDataFn (obj) {
  let flag = resizeGobleFields.some(item => {
    return item.uuid === obj.uuid
  })
  if (!flag) {
    resizeGobleFields.push(obj)
  }
  return resizeGobleFields
}

// 根据浏览器缩放比例控制内容宽度
export function emitWindowResize (context, field, field2, sourceValue = 120, uuid) {
  let obj = {
    context, field, field2, sourceValue, uuid: uuid
  }
  cachDataFn(obj)
  window.onresize = () => {
    let zoomWidth = detectZoom()
    let scale = zoomWidth / 100
    // 根据窗口大型控制操作列宽度
    let arys = [...resizeGobleFields]
    arys.forEach(item => {
      if (zoomWidth < 100) {
        scale = scale < 0.8 ? 0.8 : scale
        item.context[item.field] = item.sourceValue * scale
      } else {
        scale = 1
        item.context[item.field] = item.sourceValue
      }
      item.context[item.field2] = scale
    })
  }
}

// 重置表单元素初始值
export function resetFormValue (obj = {}) {
  for (let key in obj) {
    obj[key] = Array.isArray(obj[key]) ? [] : ''
  }
}

// 函数节流
export function throttleFn (fn, wait) {
  let isRun = true
  return function () {
    if (!isRun) {
      return
    }
    isRun = false
    setTimeout(() => {
      fn.apply(this, arguments)
      isRun = true
    }, wait)
  }
}

export function expireTimeOption () {
  return {
    disabledDate (date) {
      // 当天可选：date.getTime() < Date.now() - 24 * 60 * 60 * 1000
      // return date.getTime() < Date.now()
      return date.getTime() < Date.now() - 24 * 60 * 60 * 1000
    }
  }
}
// 组合函数
export function composeFn (...funcs) {
  return function (x) {
    return funcs.reduce(function (arg, fn) {
      return fn(arg)
    }, x)
  }
}

// 缓存函数计算结果
export function memorizeFn (fn) {
  var cache = Object.create(null)
  return function (...args) {
    const _args = JSON.stringify(args)
    return cache[_args] || (cache[_args] = fn.apply(fn, args))
  }
}
