import request from '@/scripts/request'

export function fetchlList () {
  return request({
    url: '/templates',
    method: 'get'
  })
}
export function fetchTemplate (hash) {
  return request({
    url: '/templates/' + hash,
    method: 'get'
  })
}

export function updateTemplate (data) {
  return request({
    url: '/templates/' + data.hash,
    method: 'put',
    data
  })
}

export function createTemplate (data) {
  return request({
    url: '/templates',
    method: 'post',
    data
  })
}

export function deleteTemplate () {
  return request({
    url: '/templates',
    method: 'delete'
  })
}
