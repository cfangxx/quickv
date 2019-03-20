import request from '@/scripts/request'
import { getUserId } from '@/scripts/auth'

export function fetchList (query) {
  const id = getUserId()
  return request({
    url: '/user/' + id + '/dashboards',
    method: 'get',
    params: query
  })
}

export function fetchDashboard (hash) {
  return request({
    url: '/dashboards/' + hash,
    method: 'get'
  })
}

export function createDashboard (data) {
  const id = getUserId()
  return request({
    url: '/user/' + id + '/dashboards',
    method: 'post',
    data
  })
}

export function updateDashboard (data) {
  return request({
    url: '/dashboards/' + data.hash,
    method: 'put',
    data
  })
}

export function deleteDashboard (hash) {
  return request({
    url: '/dashboards/' + hash,
    method: 'delete'
  })
}
