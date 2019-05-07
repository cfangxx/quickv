<template>
  <div>
    <div v-show="tab === 1">
      <!-- 基础设置 -->
      <basicSetting :activeElement="activeElement"/>

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
      <dataSetting :activeElement="activeElement"/>
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
import vpd from '@/components/Dashboard/Designer/mixins/vpd'
import dataSetting from '@/components/Dashboard/Widgets/common/dataSetting'
import basicSetting from '@/components/Dashboard/Widgets/common/basicSetting'
export default {
  name: 'BraidChinaMapStyle',
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
