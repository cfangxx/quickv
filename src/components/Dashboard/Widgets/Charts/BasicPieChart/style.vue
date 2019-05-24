<template>
  <div>
    <div v-show="tab === 1">
      <!-- 基础设置 -->
      <basic-settings :activeElement="activeElement"/>

      <div class="panel-item-new">
        <div @click="isShowBarItem = !isShowBarItem" class="panel-item-title">饼图设置<i :class="isShowBarItem ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowBarItem" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">外圆大小</div>
            <div>
              <input
                v-model="activeElement.seriesRadius[1]"
                type="text">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">内圆大小</div>
            <div>
              <input
                v-model="activeElement.seriesRadius[0]"
                type="text">
            </div>
          </div>
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示文本</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showTitle"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
            v-show="activeElement.showTitle"
            class="panel-row">
            <div class="panel-label">文本大小</div>
            <div>
              <input
                v-model="activeElement.titleFontSize"
                type="number"
                min="0">
            </div>
          </div>
          <div
            v-show="activeElement.showTitle"
            class="panel-row">
            <div class="panel-label">文本颜色</div>
            <div class="panel-value">{{ activeElement.titleColor }}</div>
            <div>
              <input
                v-model="activeElement.titleColor"
                type="color">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">配置颜色</div>
            <div class="panel-setcolor">
              <div
                v-for="(value, index) in activeElement.colorArr"
                :key="index"
                :data-val="value"
                :data-ind="index"
                class="panel-setcolor-item">
                <div class="panel-value-new">{{ value }}</div>
                <div>
                  <input
                    v-model="activeElement.colorArr[index]"
                    type="color">
                </div>
                <button
                  v-if="index == 0"
                  class="pannel-setcolor-item-btn"
                  @click="addLGColor">添加</button>
                <button
                  v-else
                  class="pannel-setcolor-item-btn"
                  @click="delLGColor(index)">删除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="tab === 2">
      <data-settings :activeElement="activeElement"/>
    </div>

    <div v-show="tab === 3">
      <div class="panel-item-new">
        <div @click="isShowTooltip = !isShowTooltip" class="panel-item-title">ToolTip设置<i :class="isShowTooltip ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowTooltip" class="panel-item-new-set">
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示提示框</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showToolTip"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
            v-show="activeElement.showToolTip"
            class="panel-row"
            flex>
            <div class="panel-label">开启轮播</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.autoToolTip"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
            v-show="activeElement.showToolTip && activeElement.autoToolTip"
            class="panel-row">
            <div class="panel-label">轮播时间</div>
            <div>
              <input
                v-model="activeElement.autoToolTipTime">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataSettings from '../../CommonModule/DataSettings'
import BasicSettings from '../../CommonModule/BasicSettings'

export default {
  name: 'BasicPieChartStyle',
  components: {
    DataSettings,
    BasicSettings
  },
  props: ['activeElement', 'tab'],
  data () {
    return {
      isShowX: true,
      isShowY: true,
      isShowBar: true,
      isShowBarItem: true,
      isShowTooltip: true
    }
  },
  methods: {
    addLGColor () {
      const params = {
        property: 'colorArr',
        data: '#0000ff'
      }
      this.$vpd.commit('ADD_COLOR', params)
    },
    delLGColor (index) {
      const params = {
        property: 'colorArr',
        data: {
          index: index
        }
      }
      this.$vpd.commit('DELETE_COLOR', params)
    }
  }
}
</script>
