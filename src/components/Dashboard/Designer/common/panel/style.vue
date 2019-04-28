<template>
  <div
    v-if="!activeElement.page && tab === 1"
    class="panel-wrap">
    <!-- 公共属性 -->
    <div style="display: none" class="panel-row">
      <vpd-icon name="layers" />
      <div class="panel-label">层级</div>
      <div class="panel-value">{{ activeElement.z }}</div>
      <div class="panel-slider-wrap">
        <vpd-slider
          v-model="activeElement.z"
          :step="1"
          :max="20" />
      </div>
    </div>

    <div style="display: none" class="panel-row">
      <vpd-icon name="more-vertical" />
      <div class="panel-label">高度</div>
      <div class="panel-value">{{ activeElement.height }}</div>
      <div class="panel-slider-wrap">
        <vpd-slider
          v-model="activeElement.height"
          :step="1"
          :max="height" />
      </div>
    </div>

    <div style="display: none" class="panel-row">
      <vpd-icon name="arrow-right" />
      <div class="panel-label">横坐标</div>
      <div class="panel-value">{{ activeElement.left }}</div>
      <div class="panel-slider-wrap">
        <vpd-slider
          v-model="activeElement.left"
          :step="1"
          :max="width" />
      </div>
    </div>

    <div style="display: none" class="panel-row">
      <vpd-icon name="arrow-down" />
      <div class="panel-label">纵坐标</div>
      <div class="panel-value">{{ activeElement.top }}</div>
      <div class="panel-slider-wrap">
        <vpd-slider
          v-model="activeElement.top"
          :step="1"
          :max="height" />
      </div>
    </div>

    <ul class="tab tab-block panel-tab">
      <li
        :class="{active: activeTab === 1}"
        class="tab-item"
        @click="activeTab = 1"><a>参数</a></li>
      <li
        :class="{active: activeTab === 2}"
        class="tab-item"
        @click="activeTab = 2"><a>数据</a></li>
      <li
        :class="{active: activeTab === 3}"
        class="tab-item"
        @click="activeTab = 3"><a>高级</a></li>
    </ul>
    <!-- 组件样式 -->
    <component
      :is="widgetStyle"
      :tab="activeTab"
      :active-element="activeElement" />
    <!-- 添加到容器 -->
    <!--<div v-if="activeElement.isChild">-->
    <div style="display: none">
      <hr>
      <div class="panel-row">
        <vpd-icon name="layout" />
        <div class="panel-label">所属容器</div>
        <div class="panel-value">
          <select v-model="activeElement.belong">
            <option>page</option>
            <option
              v-for="(val, index) in containerName"
              :key="index">{{ val }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import widget from '../../plugins/widget'
import vpd from '../../mixins/vpd'

export default {
  name: 'PanelStyle',
  mixins: [vpd],
  props: ['activeElement', 'tab'],
  data () {
    return {
      activeTab: 1
    }
  },

  computed: {
    widgetStyle () {
      const styles = widget.getWidgetStyle()
      let result = {}
      for (let item in styles) {
        if (styles[item].type === this.activeElement.type) {
          result = styles[item]
        }
      }

      return result
    },
    // 页面高度
    height () {
      return this.$vpd.state.page.height
    },
    // 页面宽度
    width () {
      return this.$vpd.state.page.width
    },
    // 容器名称
    containerName () {
      var arr = []
      this.$vpd.state.widgets.map(
        val => val.isContainer && val.name && arr.push(val.name)
      )

      return arr
    }
  }
}
</script>
