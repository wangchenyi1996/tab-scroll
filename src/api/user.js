/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'

/**
 * 用户登录
 */
export function login (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 * 取消关注用户
 */
export function unFollowUser (userId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

/**
 * 获取当前登录用户自己信息
 */
export function getSelf () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

/**
 * 更新用户照片资料
 */
export function updateUserPhoto (formData) {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    // Content-Type multipart/form-data
    // 必须传递 FormData 对象
    data: formData
  })
}

/**
 * 获取验证码
 */
export function sendSmsCode (mobile) {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取指定用户信息
 */
export function getUserById (userId) {
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${userId}`
  })
}

/**
 * 获取用户的关注列表
 */
export function getFollowingsByUser (userId, params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/followings',
    params,
    data: {
      target: userId.toString()
    }
  })
}

/**
 * 获取用户的粉丝列表
 */
export function getFollowersByUser (userId, params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/followers',
    params,
    data: {
      target: userId.toString()
    }
  })
}
