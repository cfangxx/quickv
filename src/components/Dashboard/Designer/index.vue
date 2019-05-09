<template>
  <div class="app">
    <navbar/>
    <div class="body container grid-xl">
      <div class="columns col-gapless">
        <toolbar
          :zoom="zoom"
          class="toolbar column"/>
        <div :style="styleObj" class="viewport viewport-new">
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

import Navbar from './components/Navbar'
import Toolbar from './components/Toolbar.vue'
import Panel from './components/Panel'
import Viewport from './components/Viewport'
import Slider from './components/Slider.vue'
import Toast from './components/Toast.vue'
import Uploader from './components/Uploader.vue'

import WidgetLibrary from './plugins/widget'

import vpd from './mixins/vpd'

export default {
  name: 'VuePageDesigner',
  components: {
    Navbar, // 顶部导航栏
    Toolbar, // 左侧菜单栏
    Panel, // 右侧参数面板
    Viewport, // 页面画布
    [Toast.name]: Toast, // 提示组件
    [Uploader.name]: Uploader, // 上传组件
    [Slider.name]: Slider
  },
  mixins: [vpd],
  props: {
    page: Object,
    widgets: Array,
    upload: Function,
    uploadOption: Object
  },
  data () {
    return {
      styleObj: {
        width: (1920 - 299) + 'px'
      }
    }
  },

  computed: {
    zoom () {
      return this.$vpd.state.page.zoom
    }
  },

  beforeCreate () {
    // TODO: custom svg path by config
    // loadSprite('//unpkg.com/vue-page-designer/dist/icons.svg', 'svgspriteit')
  },

  created () {
    // 注册所有可用 widget
    Vue.use(WidgetLibrary)

    // 清空画布
    this.$vpd.initState()

    this.$vpd.$on('save', () => {
      this.$vpd.commit('initActive')
      this.$emit('save', this.$vpd.state)
    })
    this.$vpd.$on('quit', () => {
      this.$emit('quit', this.$vpd.state)
    })
  },

  mounted () {
    window.onresize = () => {
      return (() => {
        this.handleLableWidth()
      })()
    }
    this.handleLableWidth()
  },

  updated () {
    // 初始化选中元件（将页面作为初始选中元件）
    this.$vpd.commit('initActive')
  },

  methods: {
    dozoom (val) {
      this.$vpd.commit('zoom', val)
    },
    handleLableWidth () {
      const wid = window.innerWidth
      this.styleObj.width = (wid - 299) + 'px'
    }
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
  width: 500px;
  height: 40px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -250px;
  background-color: #90939975;
  opacity: 0;
  transition: opacity 0.3s;
}

.viewport:hover .zoom-wrap {
  opacity: 1;
}

.zoom-value {
  position: absolute;
  top: 10px;
  color: white;
  right: 8px;
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
  left:0;
  flex:1;
  z-index: 1;
}

.navbar1.container.grid-xl {
  max-width: 12200px;
}

ul li {
  list-style: none;
  margin: 0;
  padding:0;
}

</style>
