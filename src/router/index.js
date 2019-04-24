import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/public/Layout' // 整体布局

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/Redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/AuthRedirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/ErrorPage404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/ErrorPage401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'manage',
    children: [
      {
        path: 'manage',
        component: () => import('@/views/dashboard/Manage'),
        name: 'manage',
        meta: { title: '大屏管理', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/dashboard/:hash',
    component: () => import('@/views/dashboard/Preview'),
    hidden: true
  },
  {
    path: '/edit/dashboard/:hash',
    component: () => import('@/views/dashboard/Designer'),
    hidden: true
  }
]

export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/template',
    component: Layout,
    redirect: '/template/index',
    meta: {
      title: 'template',
      icon: 'component',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        force: true,
        component: () => import('@/views/dashboard/Template.vue'),
        name: 'TemplateManage',
        meta: {
          title: '模板管理',
          roles: ['admin'], // or you can only set roles in sub nav
          noCache: true,
          affix: true
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export var DashboardRouterMap = [
  {
    path: '/preview',
    component: Layout,
    name: 'Dashboard',
    meta: {
      title: '我的大屏',
      icon: 'chart'
    },
    children: [{
      path: ':hash',
      component: () => import('@/views/dashboard/Preview')
    }
    ]
  }
]
