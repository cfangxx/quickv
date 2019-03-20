import { loginByUsername, logout } from '@/api/login'
import { getUserInfo } from '@/api/user'
import { fetchList } from '@/api/dashboard'
import { setToken, removeToken, setUserId, removeUserId } from '@/scripts/auth'
import { constantRouterMap } from '@/router'
import store from '@/store/index'

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
          commit('SET_USER_ID', response.id)
          setUserId(response.id)

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
          if (!response) {
            reject(new Error('Verification failed, please login again.'))
          }

          const user = response.data
          if (user.roles && user.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', user.roles)
          } else {
            reject(new Error('getInfo: roles must be a non-null array!'))
          }

          commit('SET_NAME', user.name)
          commit('SET_AVATAR', user.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户大屏列表, 添加路由
    GetUserDashboardList ({commit, state}) {
      return new Promise((resolve, reject) => {
        const routers = [
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
          const list = response.data
          if (list && list.total > 0) {
            list.items.forEach(item => {
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
          commit('SET_ROLES', response.roles)
          commit('SET_NAME', response.name)
          commit('SET_AVATAR', response.avatar)
          commit('SET_INTRODUCTION', response.introduction)
          dispatch('GenerateRoutes', response) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
