import request from '@/scripts/request'
import store from '@/store'

export function fetchList (query) {
  const id = store.getters.userId
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
  const id = store.getters.userId
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
