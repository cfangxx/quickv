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
        if (response.data) {
          this.value = response.data
        }

        if (response.data.config) {
          this.config = response.data.config
        }
      })
    }
  }
}
</script>
