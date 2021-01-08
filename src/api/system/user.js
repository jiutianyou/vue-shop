import fetch from '@/utils/fetch'
// 获取用户列表
export function getUserList (params) {
  return fetch({
    url: '/system/user/findUserList',
    method: 'get',
    params
  })
}
// 更改用户
export function updateUserById (data) {
  return fetch({
    url: '/system/user/update',
    method: 'post',
    data
  })
}
