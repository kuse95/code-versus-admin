import http from '@/utils/http'

function valid(id) {
  return http.post(`/adminAccount/valid/${id}`)
}
function update() {
  return http.post(`/adminAccount/updateAdminAccount`)
}
function invalid(id) {
  return http.post(`/adminAccount/invalid/${id}`)
}
function list() {
  return http.post(`/adminAccount/findByPage`)
}
function create() {
  return http.post(`/adminAccount/createAdminAccount`)
}
function assignRolesToUser() {
  return http.post(`/adminAccount/assignRolesToUser`)
}
function assignPlatformsToUser() {
  return http.post(`/adminAccount/assignPlatformsToUser`)
}
function listOfCurrent() {
  return http.get(`/adminAccount/getCurrentUserRoles`)
}
function infoOfCurrent() {
  return http.get(`/adminAccount/getCurrentUserInfo`)
}
function info(id) {
  return http.get(`/adminAccount/findById/${id}`)
}

export default {
  valid,
  invalid,
  info,
  infoOfCurrent,
  create,
  update,
  list,
  listOfCurrent,
  assignRolesToUser,
  assignPlatformsToUser
}
