<template>
  <vue-page-designer
    :page="config"
    :widgets="widget"
    :upload="handleUpload"
    :upload-option="uploadOption"
    @save="handleSave"
    @quit="handleQuit"/>
</template>

<script>
import Vue from 'vue'
import { fetchDashboard, updateDashboard } from '@/api/dashboard'
import { fetchTemplate, updateTemplate } from '@/api/template'
import domtoimage from 'dom-to-image'
import { Loading } from 'element-ui'

import vuePageDesigner from '@/components/Dashboard/Designer'
Vue.use(vuePageDesigner)

export default {
  name: 'EditDashboard',
  data () {
    return {
      hash: this.$route.params.hash,
      details: null,
      config: null,
      widget: [],
      uploadOption: {
        url: process.env.BASE_API + '/upload/image/' + this.$route.params.hash
        // url: 'https://jsonplaceholder.typicode.com/photos'
      },
      isTemplate: false
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.isTemplate = (route.query && route.query.redirect) !== undefined
      },
      immediate: true
    }
  },

  created () {
    this.$nextTick(() => {
      this.getDashboardConfig()
    })
  },

  methods: {
    handleSave (config) {
      const loadingInstance = Loading.service({ fullscreen: true, text: '正在保存...' })

      var dashboard = { ...this.details }
      dashboard['config'] = config.page
      dashboard['widget'] = config.widgets

      var Painter = document.getElementById('viewport-screen')

      domtoimage.toPng(Painter, { style: { 'transform': 'scale(1)' } })
        .then(function (imgData) {
          dashboard['imgData'] = imgData
        }).then(() => {
          // 提交修改
          const updateConfig = (this.isTemplate) ? updateTemplate : updateDashboard
          updateConfig(dashboard).then(response => {
            if (response.code === 0) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 50,
                duration: 2000
              })
            }

            this.$nextTick(() => {
              loadingInstance.close()
            })
          }).catch(() => {
            this.$notify({
              title: '错误',
              message: '保存失败, 请重试',
              type: 'error',
              offset: 50,
              duration: 2000
            })

            this.$nextTick(() => {
              loadingInstance.close()
            })
          })
        }).catch(() => {
          this.$notify({
            title: '错误',
            message: '保存失败, 请重试',
            type: 'error',
            offset: 50,
            duration: 2000
          })
          this.$nextTick(() => {
            loadingInstance.close()
          })
        })
    },
    handleQuit () {
      this.$router.push({ path: '/' + (this.isTemplate ? 'template' : '') })
    },
    handleUpload (files) {
      return new Promise(resolve => {
        resolve({
          files: files,
          status: 200
        })
      })
    },
    getDashboardConfig () {
      const fetchConfig = (this.isTemplate) ? fetchTemplate : fetchDashboard

      fetchConfig(this.hash).then(response => {
        if (response.data) {
          this.details = response.data

          if (response.data.config) {
            this.config = response.data.config
            this.widget = response.data.widget
          }
        }
      })
    }
  }
}
</script>
