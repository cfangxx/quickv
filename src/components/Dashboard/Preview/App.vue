<template>
  <div class="body container grid-xl">
    <div class="columns col-gapless">
      <div class="viewport column">
        <viewport/>

      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import widget from '../Designer/plugins/widget'
import viewport from '../Designer/common/viewport/index.vue'
import vpd from '../Designer/mixins/vpd'

export default {
  name: 'VuePagePreview',
  components: {
    viewport // 页面画布
  },
  mixins: [vpd],
  props: {
    value: Object,
    widgets: Object
  },
  created () {
    // 注册 widgets
    Vue.use(widget, {
      widgets: this.widgets
    })
    // 初始化已有数据
    if (this.value) {
      this.$vpd.replaceState(this.value)
    }
  },
  watch: {
    value: {
      handler (newValue, oldValue) {
        this.$vpd.replaceState(newValue)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
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
#svgspriteit {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
</style>
