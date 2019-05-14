<template>
  <div>
    <div v-show="tab === 1">
      <!-- 基础设置 -->
      <basic-settings :activeElement="activeElement"/>

      <div class="panel-item-new">
        <div class="panel-item-title">{{activeElement.axisReverse ? 'Y 轴' : 'X 轴'}}</div>
        <div class="panel-row">
          <div class="panel-label">文本颜色</div>
          <div class="panel-value">{{ activeElement.xTextColor }}</div>
          <div>
            <input
              v-model="activeElement.xTextColor"
              type="color">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">轴线颜色</div>
          <div class="panel-value">{{ activeElement.xLineColor }}</div>
          <div>
            <input
              v-model="activeElement.xLineColor"
              type="color">
          </div>
        </div>
        <div
          class="panel-row"
          flex>
          <div class="panel-label">显示轴</div>
          <div class="panel-value">
            <label class="form-switch">
              <input
                v-model="activeElement.showX"
                type="checkbox" >
              <i class="form-icon"/>
            </label>
          </div>
        </div>
        <div
          class="panel-row"
          flex>
          <div class="panel-label">显示网格</div>
          <div class="panel-value">
            <label class="form-switch">
              <input
                v-model="activeElement.showXSplitLine"
                type="checkbox" >
              <i class="form-icon"/>
            </label>
          </div>
        </div>
        <div
          class="panel-row"
          flex>
          <div class="panel-label">显示刻度</div>
          <div class="panel-value">
            <label class="form-switch">
              <input
                v-model="activeElement.showXaxisTick"
                type="checkbox" >
              <i class="form-icon"/>
            </label>
          </div>
        </div>
        <div
          class="panel-row"
          v-show="activeElement.showXaxisTick"
          flex>
          <div class="panel-label">刻度偏移</div>
          <div class="panel-value">
            <label class="form-switch">
              <input
                v-model="activeElement.xAxisLabel"
                type="checkbox" >
              <i class="form-icon"/>
            </label>
          </div>
        </div>

      </div>
      <div class="panel-item-new">
        <div class="panel-item-title">{{activeElement.axisReverse ? 'X 轴' : 'Y 轴'}}</div>
        <div class="panel-row">
          <div class="panel-label">文本颜色</div>
          <div class="panel-value">{{ activeElement.yTextColor }}</div>
          <div>
            <input
              v-model="activeElement.yTextColor"
              type="color">
          </div>
        </div>
        <div
          class="panel-row"
          flex>
          <div class="panel-label">显示轴</div>
          <div class="panel-value">
            <label class="form-switch">
              <input
                v-model="activeElement.showY"
                type="checkbox" >
              <i class="form-icon"/>
            </label>
          </div>
        </div>
        <div
          class="panel-row"
          flex>
          <div class="panel-label">显示网格</div>
          <div class="panel-value">
            <label class="form-switch">
              <input
                v-model="activeElement.showYSplitLine"
                type="checkbox" >
              <i class="form-icon"/>
            </label>
          </div>
        </div>
        <div
          class="panel-row"
          flex>
          <div class="panel-label">显示刻度</div>
          <div class="panel-value">
            <label class="form-switch">
              <input
                v-model="activeElement.showYTick"
                type="checkbox" >
              <i class="form-icon"/>
            </label>
          </div>
        </div>
        <div
          class="panel-row"
          flex>
          <div class="panel-label">显示轴线</div>
          <div class="panel-value">
            <label class="form-switch">
              <input
                v-model="activeElement.showYLine"
                type="checkbox" >
              <i class="form-icon"/>
            </label>
          </div>
        </div>
        <div
          v-show="activeElement.showYLine"
          class="panel-row">
          <div class="panel-label">轴线颜色</div>
          <div class="panel-value">{{ activeElement.yLineColor }}</div>
          <div>
            <input
              v-model="activeElement.yLineColor"
              type="color">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">标线颜色</div>
          <div class="panel-value">{{ activeElement.splitLineColor }}</div>
          <div>
            <input
              v-model="activeElement.splitLineColor"
              type="color">
          </div>
        </div>

      </div>
      <div class="panel-item-new">
        <div class="panel-item-title">图表设置</div>
        <div class="panel-row">
          <div class="panel-label">上边距</div>
          <div>
            <input
              v-model="activeElement.gridTop">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">下边距</div>
          <div>
            <input
              v-model="activeElement.gridBottom">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">左边距</div>
          <div>
            <input
              v-model="activeElement.gridLeft">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">右边距</div>
          <div>
            <input
              v-model="activeElement.gridRight">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">标题</div>
          <div>
            <input
              v-model="activeElement.chartTitle">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">标题颜色</div>
          <div class="panel-value">{{ activeElement.titleColor }}</div>
          <div>
            <input
              v-model="activeElement.titleColor"
              type="color">
          </div>
        </div>

      </div>
      <div class="panel-item-new">
        <div class="panel-item-title">柱体设置</div>
        <div class="panel-row">
          <div class="panel-label">宽度</div>
          <div>
            <input v-model="activeElement.seriseBarWidth">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">圆角</div>
          <div>
            <input
              v-model="activeElement.seriseRadius1"
              type="number"
              min="0"
              class="radiusInp">
            <input
              v-model="activeElement.seriseRadius2"
              type="number"
              min="0"
              class="radiusInp">
            <input
              v-model="activeElement.seriseRadius3"
              type="number"
              min="0"
              class="radiusInp">
            <input
              v-model="activeElement.seriseRadius4"
              type="number"
              min="0"
              class="radiusInp">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">配置颜色</div>
          <div class="panel-setcolor">
            <div
              v-for="(item,index) in activeElement.lgArr"
              :key="index"
              class="panel-setcolor-item">
              <div class="panel-value-new">{{ item.color }}</div>
              <div>
                <input
                  v-model="item.color"
                  type="color">
                <input
                  v-if="activeElement.lgArr.length > 1"
                  v-model="item.offset"
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  class="radiusInp">
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

    <div v-if="tab === 2">
      <data-settings :activeElement="activeElement"/>
    </div>

    <div v-show="tab === 3">
      <div
        class="panel-row"
        flex>
        <div class="panel-label">X/Y轴翻转</div>
        <div class="panel-value">
          <label class="form-switch">
            <input
              v-model="activeElement.axisReverse"
              type="checkbox" >
            <i class="form-icon"/>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataSettings from '../../CommonModule/DataSettings'
import BasicSettings from '../../CommonModule/BasicSettings'

export default {
  name: 'BasicBarChartStyle',
  components: {
    DataSettings,
    BasicSettings
  },
  props: ['activeElement', 'tab'],
  methods: {
    addLGColor () {
      let params = {
        property: 'lgArr',
        data: {
          color: '#0000ff',
          offset: 1
        }
      }
      this.$vpd.commit('ADD_COLOR', params)
    },
    delLGColor (index) {
      let params = {
        property: 'lgArr',
        data: {
          index: index
        }
      }
      this.$vpd.commit('DELETE_COLOR', params)
    }
  }
}
</script>
