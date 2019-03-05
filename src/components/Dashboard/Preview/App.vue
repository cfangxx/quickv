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
  }
}
</script>

<style lang="scss">
.body {
  width: 100%;
  height: calc(100% - 54px);
  overflow: hidden;
  flex-direction: row;
  &.container {
    padding: 0;
  }
}
.columns {
  height: 100%;
}
.toolbar,
.viewport,
.control-panel {
  height: 100%;
}
.toolbar {
  background: #fff;
  user-select: none;
  box-sizing: content-box;
  &.column {
    flex: none;
    width: 120px;
  }
}
.viewport {
  position: relative;
  overflow: hidden;
}
.control-panel {
  background: #fff;
  user-select: none;
  &.column {
    flex: none;
    width: 400px;
  }
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
