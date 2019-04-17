<template>
  <vue-page-preview
    :value="config"/>
</template>

<script>
import vuePagePreview from '@/components/Dashboard/Preview/index'
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
        if (response && response.data) {
          const dashboard = response.data
          if (dashboard.config) {
            this.config = dashboard.config
          }
        }
      })
    }
  }
}
</script>
