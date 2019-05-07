<template>
  <div>
    <div v-show="tab === 1">
      <!-- 基础设置 -->
      <basicSetting :activeElement="activeElement"/>

      <div class="panel-item-new">
        <div class="panel-item-title">进度条设置</div>
        <div class="panel-row">
          <div class="panel-label">环形颜色</div>
          <div class="panel-value">{{ activeElement.colorArr[1] }}</div>
          <div>
            <input
              v-model="activeElement.colorArr[1]"
              type="color">
          </div>
        </div>
        <div
          class="panel-row"
          flex>
          <div class="panel-label">进度条渐变</div>
          <div class="panel-value">
            <label class="form-switch">
              <input
                v-model="activeElement.isLinear"
                type="checkbox" >
              <i class="form-icon"/>
            </label>
          </div>
        </div>
        <div
          v-show="activeElement.isLinear"
          class="panel-row">
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
        <div
          v-show="!activeElement.isLinear"
          class="panel-row">
          <div class="panel-label">进度条颜色</div>
          <div class="panel-value">{{ activeElement.colorArr[0] }}</div>
          <div>
            <input
              v-model="activeElement.colorArr[0]"
              type="color">
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

      </div>
    </div>

    <!-- 数据源设置 -->
    <div v-if="tab === 2">
      <dataSetting :activeElement="activeElement"/>
    </div>

    <div v-show="tab === 3">

    </div>
  </div>
</template>

<script>
import vpd from '@/components/Dashboard/Designer/mixins/vpd'
import dataSetting from '@/components/Dashboard/Widgets/common/dataSetting'
import basicSetting from '@/components/Dashboard/Widgets/common/basicSetting'

export default {
  name: 'BraidProgressBarStyle',
  components: {
    dataSetting,
    basicSetting
  },
  mixins: [vpd],
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
      this.$vpd.commit('addColor', params)
    },
    delLGColor (index) {
      let params = {
        property: 'lgArr',
        data: {
          index: index
        }
      }
      this.$vpd.commit('delColor', params)
    }
  }
}
</script>
<style >
  .panel-item-new{
    padding-bottom:10px;
  }
  .monaco-cont{
    width:200px;
  }
</style>
