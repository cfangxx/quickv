import request from '@/scripts/request'
import { getUserId } from '@/scripts/auth'

export function getUserInfo () {
  const id = getUserId()
  return request({
    url: '/user/' + id + '/info',
    method: 'get'
  })
}

export function updataAccount (data) {
  const id = getUserId()
  return request({
    url: '/user/' + id + '/account',
    method: 'post',
    data
  })
}
