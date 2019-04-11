<template>
    <vue-page-designer
      :value="config"
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

import vuePageDesigner from '@/components/Dashboard/Designer'
Vue.use(vuePageDesigner)

export default {
  name: 'EditDashboard',
  data () {
    return {
      hash: this.$route.params.hash,
      details: null,
      config: null,
      uploadOption: {
        url: 'https://jsonplaceholder.typicode.com/photos'
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
      var dashboard = {...this.details}

      dashboard['hash'] = this.hash
      dashboard['config'] = config
      dashboard['name'] = config.page.title
      dashboard['resolution '] = config.page.width + ' X ' + config.page.height

      var Painter = document.getElementById('viewport').children[0]

      domtoimage.toPng(Painter)
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
                duration: 2000
              })
            }
          })
        }).catch(function (error) {
          console.error('oops, something went wrong!', error)
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
          }
        }
      })
    }
  }
}
</script>
