<template>
  <div class="menu-bar toolbar-new column-new">
    <ul
      class="widget-list columns-new"
      @mousedown="updateSrollTop">
      <li
        v-for="item in widgets"
        :key="item.name"
        class="menu-item column col-6 col-6-new"
        @click="(e) => {addWidget(e, item)}">
        <vpd-icon
          :svg="item.icon"
          :title="item.title" />
        <span class="menu-caption">{{ item.title }}</span>
      </li>
    </ul>
    <details style="display: none;">
      <summary><vpd-icon name="layers" />已加组件</summary>
      <ul class="layer-list">
        <li
          v-for="layer in layers"
          :class="{'layer-active': layer === activeElement}"
          :key="layer.uuid"
          @click="(e) => {activeLayer(e, layer)}">{{ getWidgetTitle(layer.type) }}</li>
      </ul>
    </details>
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
    return {}
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
    }
  }
}
</script>

<style>
  .column{
    box-sizing: border-box;
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
<style>
  .menu-item.col-6-new{
    width:25%;
    float:left;
  }
  .toolbar-new.column-new{
    width:100%;
    background-color:#fff;
    border-radius: 4px;
    border:1px solid #ddd;
    box-shadow: 0 2px 6px rgba(0,0,0,.1);
  }
  .columns-new{
    height:auto;
  }
</style>
