<template>
    <vue-page-designer
      :value="config"
      :upload="handleUpload"
      :upload-option="uploadOption"
      @save="handleSave" />
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
    fetchDashboard(this.$route.params.hash).then(response => {
      const rsp = response.data
      this.value = rsp.data
      this.config = rsp.data.config
    })
  },

  methods: {
    handleSave (data) {
      var payload = this.value
      payload.config = JSON.stringify
      updateDashboard(payload).then(response => {

      })
    },
    handleUpload (files) {
      console.log('uploading:', files)
      return new Promise(resolve => {
        resolve({
          files: files,
          status: 200
        })
      })
    }
  }
}
</script>
