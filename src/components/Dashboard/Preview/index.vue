<template>
  <div class="body container grid-xl">
    <div class="columns col-gapless">
      <div class="viewport column">
        <viewport
        preview/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import widgetLibrary from '../Designer/plugins/widget'
import viewport from '../Designer/common/viewport/index.vue'
import vpd from '../Designer/mixins/vpd'

export default {
  name: 'VuePagePreview',
  components: {
    viewport
  },
  mixins: [vpd],
  props: {
    page: Object,
    widgets: Array
  },
  created () {
    Vue.use(widgetLibrary)
  },
  watch: {
    page: {
      handler (newValue, oldValue) {
        this.$vpd.replacePage(newValue)
        this.$vpd.commit('initActive')
      },
      deep: true
    },
    widgets: {
      handler (newValue, oldValue) {
        this.$vpd.replaceWidgets(newValue)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.columns {
  height: 100%;
}
.viewport,
.control-panel {
  height: 100%;
}

.viewport {
  position: relative;
  overflow: hidden;
}

.viewport:hover .zoom-wrap {
  opacity: 1;
}
</style>
