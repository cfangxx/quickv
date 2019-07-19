import request from '@/scripts/request'

export function fetchMaterialList (query) {
  return request({
    // url: '/material',
    url: 'https://easy-mock.com/mock/5c7ce20ccdc04f0e04185d9b/example/material',
    method: 'get',
    params: query
  })
}
export function getTableItem (id) {
  return request({
    url: 'https://easy-mock.com/mock/5c7ce20ccdc04f0e04185d9b/example/getTable',
    method: 'get'
  })
}

export function uploadCsv (filedata) {
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/material/csv',
    method: 'post',
    data: filedata
  })
}

export function createType (param) {
  console.log(param)
  return request({
    url: '/material/' + param.hash + '/save',
    method: 'post',
    data: param
  })
}

export function createTemplate (data) {
  return request({
    url: '/templates',
    method: 'post',
    data
  })
}

export function deleteMaterial (hash) {
  return request({
    url: '/material/' + hash,
    method: 'delete'
  })
}
