<template>
  <vue-page-preview
    :value="config"/>
</template>

<script>
import vuePagePreview from '@/components/Dashboard/Preview/App'
import {fetchDashboard} from '@/api/dashboard'

export default {
  name: 'PreviewDashboard',
  components: { vuePagePreview },
  data () {
    return {
      config: null
    }
  },
  created () {
    this.$nextTick(() => {
      this.getDashboardConfig()
    })
  },

  methods: {
    getDashboardConfig () {
      fetchDashboard(this.$route.params.hash).then(response => {
        const rsp = response.data
        if (rsp.data && rsp.data.config) {
          this.config = rsp.data.config
        }
      })
    }
  }
}
</script>
