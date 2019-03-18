<template>
  <div class="app">
    <navbar/>
    <div class="body container grid-xl">
      <div class="columns col-gapless">
        <toolbar
          :zoom="zoom"
          class="toolbar column"/>
        <div :style="styleObj1" class="viewport column">
          <viewport :zoom="zoom"/>
          <div class="zoom-wrap">
            <vpd-slider
              :value="zoom"
              :step="1"
              :tuning="false"
              @input="dozoom" />
            <div class="zoom-value">{{ zoom }}%</div>
          </div>
        </div>
        <panel class="control-panel column"/>
      </div>
    </div>
    <vpd-uploader
      :upload="upload"
      :upload-option="uploadOption"/>
    <vpd-toast/>
  </div>
</template>

<script>
import Vue from 'vue'
import widget from './plugins/widget'
import navbar from './common/navbar.vue'
import toolbar from './common/toolbar.vue'
import panel from './common/panel/index.vue'
import viewport from './common/viewport/index.vue'
import loadSprite from './utils/load-sprite'
import vpd from './mixins/vpd'
import toast from './common/toast.vue'
import uploader from './common/uploader.vue'
import slider from './common/slider.vue'

export default {
  name: 'VuePageDesigner',
  components: {
    navbar, // 顶部导航栏
    toolbar, // 左侧菜单栏
    panel, // 右侧参数面板
    viewport, // 页面画布
    [toast.name]: toast, // 提示组件
    [uploader.name]: uploader, // 上传组件
    [slider.name]: slider
  },
  mixins: [vpd],
  props: {
    value: Object,
    widgets: Object,
    upload: Function,
    uploadOption: Object
  },
  data () {
    var wid = window.innerWidth
    return {
      w: wid,
      h: wid,
      styleObj1: {
        width: (wid - 40) + 'px'
      }
    }
  },

  computed: {
    zoom () {
      return this.$vpd.state.zoom
    }
  },
  beforeCreate () {
    // TODO: custom svg path by config
    loadSprite('//unpkg.com/vue-page-designer/dist/icons.svg', 'svgspriteit')
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
    this.$vpd.$on('save', () => {
      this.$emit('save', this.$vpd.state)
    })
  },
  mounted () {
    // 初始化选中元件（将页面作为初始选中元件）
    this.$vpd.commit('initActive')
  },

  methods: {
    dozoom (val) {
      this.$vpd.commit('zoom', val)
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
  /*position: relative;*/
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

.zoom-wrap {
  width: 200px;
  height: 30px;
  position: absolute;
  bottom: 20px;
  left: 100px;
  opacity: 0;
  transition: opacity 0.3s;
}

.viewport:hover .zoom-wrap {
  opacity: 1;
}

.zoom-value {
  position: absolute;
  top: 4px;
  left: -36px;
}

#svgspriteit {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.col-gapless .viewport-new {
  position: absolute;
  padding-top:60px;
  padding-left:40px;
  flex:1;
  z-index: 1;
}

.container.grid-xl {
  max-width: 12200px;
}

ul li {
  list-style: none;
  margin: 0;
  padding:0;
}

</style>
