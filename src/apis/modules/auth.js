import http from '@/utils/http'

/**
 * 密码登录
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {boolean} forceLogin 是否强制登录
 */
export function login(username, password, forceLogin = true) {
  return http.post('/auth/admin/pass', { username, password, forceLogin })
}

/**
 * 发送验证码
 * @param {string} phone 手机号
 */
export function sendSmsVerifyCode(phone) {
  return http.post('/auth/sendSmsVerifyCode', { phone })
}

/**
 * 短信登录
 * @param {string} phone 手机号
 * @param {string} verifyCode 验证码
 */
export function loginBySMS(phone, verifyCode) {
  return http.post('/auth/admin/sms', { phone, verifyCode })
}
