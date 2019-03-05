import request from '@/scripts/request'

export function fetchList () {
  return request({
    url: '/user/dashboards',
    method: 'get'
  })
}

export function fetchDashboard (id) {
  return request({
    url: '/dashboards/' + id,
    method: 'get'
  })
}

export function createDashboard (data) {
  return request({
    url: '/user/dashboards',
    method: 'post',
    data
  })
}

export function updateDashboard (data) {
  return request({
    url: '/user/dashboards',
    method: 'put',
    data
  })
}
