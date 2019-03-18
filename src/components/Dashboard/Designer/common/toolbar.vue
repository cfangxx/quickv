<template>
  <div
    :class="[isCollapse?'big-panel':'']"
    class="menu-bar-new toolbar-container toolbar-ctrl-panel"
    @mouseenter="enter()"
    @mouseleave="leave()">
    <div class="min-banner">组件管理</div>
    <div>
      <p class="toolbar-title">已加组件</p>
      <details
        open
        style="display: none;">
        <summary><vpd-icon name="list" />可用组件</summary>
        <ul
          class="widget-list columns"
          @mousedown="updateSrollTop">
          <li
            v-for="item in widgets"
            :key="item.name"
            class="menu-item column col-6"
            @click="(e) => {addWidget(e, item)}">
            <vpd-icon
              :svg="item.icon"
              :title="item.title" />
            <span class="menu-caption">{{ item.title }}</span>
          </li>
        </ul>
      </details>
      <ul class="layer-list-new">
        <li
          v-for="layer in layers"
          :class="{'layer-active': layer === activeElement}"
          :key="layer.uuid"
          @click="(e) => {activeLayer(e, layer)}">{{ getWidgetTitle(layer.type) }}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import widget from '../plugins/widget'
import { move } from '../mixins'
import { cumulativeOffset, checkInView } from '../utils/offset'
import vpd from '../mixins/vpd'

export default {
  mixins: [move, vpd],
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
    // 添加组件
    addWidget (e, item) {
      this.$vpd.dispatch('addWidget', item)
    },

    // 为确保添加的元件出现在可视区内，用画布向上滚动距离作为元件初始 top 值
    updateSrollTop () {
      var top = document.getElementById('viewport').scrollTop / this.zoom * 100
      this.$vpd.commit('updateSrollTop', top)
    },

    activeLayer (e, item) {
      this.$vpd.commit('select', {
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

<style>
  .column{
    box-sizing: border-box;
  }
  .menu-bar-new.toolbar-container{
    width:40px;
    padding:60px 0 0 30px;
    box-sizing: border-box;
  }
  .toolbar-ctrl-panel {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 120px;
    overflow-y: hidden;
    background-color: #e8e8e8;
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
  .toolbar-ctrl-panel.big-panel {
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
<style lang="scss">
  @import '../_variables.scss';
  .menu-bar {
    ul {
      list-style: none;
      margin: 0;
    }
    details {
      padding: 10px;
    }
    summary {
      padding: 5px 0;
      border-bottom: 1px solid #f5f5f5;
      .svg-icon {
        margin-right: 5px;
      }
    }
  }
  .widget-list {
    padding: 0;
  }
  .menu-item {
    text-align: center;
    cursor: pointer;
    padding: 15px 0 8px;
    transition: all 0.2s;
    position: relative;
    &:hover {
      transform: scale(1.2);
    }
    .svg-icon {
      font-size: 24px;
    }
    .menu-caption {
      display: block;
      font-size: 12px;
      width: 100%;
    }
  }
  .layer-list {
    padding: 10px;
    li {
      text-align: left;
      cursor: pointer;
      white-space: nowrap;
      line-height: 24px;
      padding-left: 5px;
      &:hover {
        background: #f5f5f5;
      }
      &::before {
        content: '› ';
      }
      &.layer-active {
        color: $light-color;
        background: $primary-color;
      }
    }
  }
</style>
