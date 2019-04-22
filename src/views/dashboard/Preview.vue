<template>
  <vue-page-preview
    :page="config"
    :widgets="widget"/>
</template>

<script>
import vuePagePreview from '@/components/Dashboard/Preview/index'
import {fetchDashboard} from '@/api/dashboard'

export default {
  name: 'PreviewDashboard',
  components: { vuePagePreview },
  data () {
    return {
      config: null,
      widget: []
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
