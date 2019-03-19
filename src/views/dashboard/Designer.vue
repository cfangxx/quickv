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
import vuePageDesigner from '@/components/Dashboard/Designer'
Vue.use(vuePageDesigner)

export default {
  name: 'EditDashboard',
  data () {
    return {
      value: null,
      config: null,
      uploadOption: {
        url: 'https://jsonplaceholder.typicode.com/photos'
      }
    }
  },

  created () {
    this.$nextTick(() => {
      this.getDashboardConfig()
    })
  },

  methods: {
    handleSave (data) {
      var payload = this.value
      // payload.config = JSON.stringify(data)
      payload.config = data
      updateDashboard(payload).then(response => {

      })
    },
    handleQuit () {
      this.$router.push('/')
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
      fetchDashboard(this.$route.params.hash).then(response => {
        const rsp = response.data
        if (rsp.data && rsp.data.config) {
          this.value = rsp.data
          this.config = rsp.data.config
        }
      })
    }
  }
}
</script>
