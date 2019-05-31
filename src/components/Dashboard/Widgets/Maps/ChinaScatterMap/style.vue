<template>
  <div>
    <div v-show="tab === 1">
      <!-- 基础设置 -->
      <basic-settings :activeElement="activeElement"/>

      <div class="panel-item-new">
        <div @click="isShowMap = !isShowMap" class="panel-item-title">图表设置<i :class="isShowMap ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowMap" class="panel-item-new-set">
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
          <div class="panel-row">
            <div class="panel-label">背景色</div>
            <div class="panel-value panel-value-color-1">{{ activeElement.bgMapColor }}</div>
            <div class="panel-value panel-value-color-2">
              <el-color-picker
                v-model="activeElement.bgMapColor"
                show-alpha
                size="mini"/>
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">边框颜色</div>
            <div class="panel-value panel-value-color-1">{{ activeElement.mapBorderColor }}</div>
            <div class="panel-value panel-value-color-2">
              <el-color-picker
                v-model="activeElement.mapBorderColor"
                show-alpha
                size="mini"/>
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">配置颜色</div>
            <div class="panel-value panel-value-color-1">{{ activeElement.mapAreaColor }}</div>
            <div class="panel-value panel-value-color-2">
              <el-color-picker
                v-model="activeElement.mapAreaColor"
                show-alpha
                size="mini"/>
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">高亮颜色</div>
            <div class="panel-value panel-value-color-1">{{ activeElement.mapEmphasisAreaColor }}</div>
            <div class="panel-value panel-value-color-2">
              <el-color-picker
                v-model="activeElement.mapEmphasisAreaColor"
                show-alpha
                size="mini"/>
            </div>
          </div>
          <div class="panel-row">
          <div class="panel-label">散点颜色</div>
          <div class="panel-value panel-value-color-1">{{ activeElement.mapEffectScatterColor }}</div>
          <div class="panel-value panel-value-color-2">
            <el-color-picker
              v-model="activeElement.mapEffectScatterColor"
              show-alpha
              size="mini"/>
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
        v-show="activeElement.autoToolTip"
        class="panel-row">
        <div class="panel-label">轮播时间</div>
        <div>
          <input
            v-model="activeElement.autoToolTipTime"> ms
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataSettings from '../../CommonModule/DataSettings'
import BasicSettings from '../../CommonModule/BasicSettings'

export default {
  name: 'ChinaScatterMapStyle',
  components: {
    DataSettings,
    BasicSettings
  },
  props: ['activeElement', 'tab'],
  data () {
    return {
      isShowMap: true
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
