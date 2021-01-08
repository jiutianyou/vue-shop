/**
 *@description 验证用户名格式 3-16个字母或数字
 * @param str
 */
export function isValidUsername (str) {
  const reg = /^[a-zA-Z0-9_]{3,100}$/
  return reg.test(str)
}

/**
 * @description 验证URL地址格式
 * @param str
 * @returns {boolean}
 */
export function isValidUrl (str) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(str)
}

/**
 * @description 判断是否全部小写
 * @param str
 * @returns {boolean}
 */
export function isLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @description 判断是否全部大写
 * @param str
 * @returns {boolean}
 */
export function isUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @description 判断是否全为字母
 * @param str
 * @returns {boolean}
 */
export function isAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @description 判断是否全为数字
 * @param str
 * @returns {boolean}
 */
export function isDigital (str) {
  const reg = /^[0-9]+$/
  return reg.test(str)
}

/**
 * @description 判断是否为电话号码
 * @param str
 * @returns {boolean}
 */
export function isPhoneNumber (str) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/
  return reg.test(str)
}

/**
 * @description 去掉空格
 * @param str
 * @returns {boolean}
 */
export function removeSpace (str) {
  let strSp = str.replace(/\s+/g, '')
  return strSp
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail (email) {
  const re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
  return re.test(email)
}
/*
 * 正整数
 *
 * */
export function validateNum (num) {
  const reg = /^[1-9]\d*$/
  return reg.test(num)
}

/**
 * @description 判断是否为电话号码
 * @param str
 * @returns {boolean}
 */
export function isTelOrPhoneNumber (str) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^([1]\d{10}|[1][0-9]\*{6}[0-9]{3}|[1]([0-9]|\*){9}[0-9]{1}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/
  return reg.test(str)
}

// 手机号或者电话号验证
export const checkPhone = function (rule, value, callback) {
  let teleReg = /^0\d{2,3}-?\d{7,8}$/
  let phoneReg = /^1\d{10}$/
  let phoneReg2 = /^1\d{3}\*{4}\d{3}$/
  if (value && (teleReg.test(value) || phoneReg.test(value) || phoneReg2.test(value))) {
    callback()
  } else {
    callback(new Error('请输入正确的电话'))
  }
}
export const checkEmail = function (rule, value, callback) {
  let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  if (!re.test(value) && value) {
    callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}
export const checkZipcode = function (rule, value, callback) {
  if (!value || value.length !== 6) {
    callback(new Error('请输入6位的邮政编码'))
  } else {
    callback()
  }
}
export const checkQQ = function (rule, value, callback) {
  let res = /^[0-9]{5,12}$/
  if (res.test(value) || !value) {
    callback()
  } else {
    callback(new Error('qq必须是5-12数字'))
  }
}
