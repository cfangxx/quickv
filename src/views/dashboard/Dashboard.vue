<template>
  <vue-page-preview
    :value="value"/>
</template>

<script>
import vuePagePreview from '@/components/Dashboard/Preview/App'
import {fetchDashboard} from '@/api/dashboard'

export default {
  name: 'PreviewDashboard',
  components: { vuePagePreview },
  data () {
    return {
      value: null
    }
  },

  created () {
    fetchDashboard(this.$route.params.hash).then(response => {
      const rsp = response.data
      this.value = rsp.data.config
    })
  }
}
</script>
