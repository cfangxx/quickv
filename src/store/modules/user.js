import { loginByUsername, logout } from '@/api/login'
import { getUserInfo } from '@/api/user'
import { fetchList } from '@/api/dashboard'
import { setToken, removeToken, setUserId, removeUserId } from '@/scripts/auth'
import { constantRouterMap } from '@/router'
import store from '@/store/index'
import { Message } from 'element-ui'

const user = {
  state: {
    id: '',
    status: '',
    code: '',
    token: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    routers: []
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_ID: (state, id) => {
      state.id = id
    },
    SET_USER_ROUTER: (state, routers) => {
      const permissionRouters = store.getters.permissionRouters
      state.routers = constantRouterMap.concat(permissionRouters).concat(routers)
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          if (data.code !== 0) {
            Message({
              message: data.msg,
              type: 'error',
              duration: 5 * 1000
            })
          }

          commit('SET_USER_ID', data.id)
          setUserId(data.id)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          if (!response.data) {
            reject(new Error('Verification failed, please login again.'))
          }
          const rsp = response.data
          if (rsp.data.roles && rsp.data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', rsp.data.roles)
          } else {
            reject(new Error('getInfo: roles must be a non-null array!'))
          }

          commit('SET_NAME', rsp.data.name)
          commit('SET_AVATAR', rsp.data.avatar)
          resolve(rsp)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户大屏列表, 添加路由
    GetUserDashboardList ({commit, state}) {
      return new Promise((resolve, reject) => {
        let routers = [
          {
            path: '/dashboard',
            name: 'Dashboard',
            meta: {
              title: '我的大屏',
              icon: 'tab'
            },
            children: [
            ]
          }
        ]
        fetchList().then(response => {
          const rsp = response.data

          if (rsp.data && rsp.data.total > 0) {
            rsp.data.items.forEach(item => {
              routers[0].children.push({
                path: item.hash,
                component: () => import('@/views/dashboard/Dashboard'),
                name: item.hash,
                meta: { title: item.name }
              })
            })
          }

          commit('SET_USER_ROUTER', routers)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeUserId()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 动态修改权限
    ChangeRoles ({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
