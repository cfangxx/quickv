<template>
  <div
    :class="[isCollapse?'big-panel':'']"
    class="menu-bar-new toolbar-container toolbar-ctrl-panel"
    @mouseenter="enter()"
    @mouseleave="leave()">
    <div class="min-banner">组件管理</div>
    <div>
      <p class="toolbar-title">已加组件</p>
      <ul class="layer-list-new">
        <li
          v-for="layer in layers"
          :class="{'layer-active': layer === activeElement}"
          :key="layer.uuid"
          @click="(e) => {activeLayer(e, layer)}">{{ layer.name }}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import widget from '../plugins/widget'
import { cumulativeOffset, checkInView } from '../utils/offset'
import vpd from '../mixins/vpd'

export default {
  mixins: [vpd],
  props: ['zoom'],
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    widgets () {
      return widget.getWidgets()
    },
    layers () {
      return this.$vpd.state.widgets
    },
    activeElement () {
      return this.$vpd.state.activeElement
    }
  },
  methods: {
    activeLayer (e, item) {
      this.$vpd.commit('SELECT_WIDGET', {
        uuid: item.uuid
      })
      let viewport = document.querySelector('#viewport')
      let target = viewport.querySelector(`[data-uuid='${item.uuid}']`)
      if (target && !checkInView(target)) {
        viewport.scrollTop = (cumulativeOffset(target).top - 50) * this.zoom / 100
      }
    },

    getWidgetTitle (type) {
      return this.widgets[type].title || ''
    },

    // new
    enter () {
      this.isCollapse = true
    },
    leave () {
      this.isCollapse = false
    }
  }
}
</script>
<style scoped>
  .toolbar.column{
    width:40px;
  }
</style>
<style>
  .menu-bar-new.toolbar-container{
    width:40px;
    padding:60px 0 0 30px;
    box-sizing: border-box;
    border-right:1px solid #ddd;
  }
  .toolbar-ctrl-panel {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 120px;
    overflow-y: hidden;
    z-index: 10;
  }
  .toolbar-ctrl-panel.min{
    width:40px;
  }
  .menu-bar-new .min-banner {
    z-index: 20;
    display: block;
    height: 100%;
    cursor: pointer;
    padding: 20px 10px 0;
    font-size: 20px;
    text-align: center;
    color:#aab2bd;
    background-color: #232d3c;
    margin-left: -3px;
    box-sizing: border-box;
  }
  .menu-bar-new.big-panel .min-banner{
    display: none;
  }
  .menu-bar-new.toolbar-ctrl-panel.big-panel {
    width: 120px;
  }
  .toolbar-title{
    background-color: #ddd;
    height:50px;
    line-height: 50px;
    margin:0;
    text-align: center;
    font-size:14px;
  }
  .layer-list-new{
    list-style-type:none;
    padding:0;
    margin:0;
    font-size: 12px;
    text-align: center;
  }
  .layer-list-new li{
    height:40px;
    line-height: 40px;
    box-sizing: border-box;
    border:1px solid #e8e8e8;
    cursor: pointer;
  }
  .layer-list-new li:hover{
    /*background-color: #eee;*/
    border:1px solid #2c3e50;
  }
</style>
