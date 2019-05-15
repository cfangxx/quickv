<template>
  <div>
    <div v-show="tab === 1">
      <!-- 基础设置 -->
      <basic-settings :activeElement="activeElement"/>

      <div class="panel-item-new">
        <div @click="isShowJiao = !isShowJiao" class="panel-item-title">角度轴<i :class="isShowJiao ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowJiao" class="panel-item-new-set">
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
            v-show="activeElement.showX"
            class="panel-row">
            <div class="panel-label">轴线颜色</div>
            <div class="panel-value">{{ activeElement.xLineColor }}</div>
            <div>
              <input
                v-model="activeElement.xLineColor"
                type="color">
            </div>
          </div>
          <div
            v-show="activeElement.showX"
            class="panel-row">
            <div class="panel-label">轴线宽度</div>
            <div>
              <input
                v-model="activeElement.xLineWidth"
                type="number">
            </div>
          </div>
          <div class="panel-row"
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
            v-show="activeElement.showXaxisTick"
            class="panel-row">
            <div class="panel-label">文字颜色</div>
            <div class="panel-value">{{ activeElement.xTextColor }}</div>
            <div>
              <input
                v-model="activeElement.xTextColor"
                type="color">
            </div>
          </div>
          <div
            v-show="activeElement.showXaxisTick"
            class="panel-row">
            <div class="panel-label">文字大小</div>
            <div>
              <input
                v-model="activeElement.xTextFontSize"
                type="number">
            </div>
          </div>
          <div
          v-show="activeElement.showXaxisTick"
          class="panel-row">
          <div class="panel-label">文字旋转</div>
          <div>
            <input
              v-model="activeElement.xLabelRotate"
              type="number">
          </div>
        </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowJing = !isShowJing" class="panel-item-title">径向轴<i :class="isShowJing ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowJing" class="panel-item-new-set">
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示标线</div>
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
          v-show="activeElement.showYSplitLine"
          class="panel-row">
          <div class="panel-label">标线颜色</div>
          <div class="panel-value">{{ activeElement.splitLineColor }}</div>
          <div>
            <input
              v-model="activeElement.splitLineColor"
              type="color">
          </div>
        </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowPolar = !isShowPolar" class="panel-item-title">图表设置<i :class="isShowPolar ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowPolar" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">大小调整</div>
            <div>
              <input
                v-model="activeElement.polarSize">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">分割段数</div>
            <div>
              <input
                v-model="activeElement.splitNumber"
                type="number"
                min="1">
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

    <!-- 数据源设置 -->
    <div v-if="tab === 2">
      <data-settings :activeElement="activeElement"/>
    </div>

    <!-- 其他设置 -->
    <div v-show="tab === 3">
      <div class="panel-item-new">
        <div @click="isShowLegend = !isShowLegend" class="panel-item-title">图例设置<i :class="isShowLegend ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowLegend" class="panel-item-new-set">
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示图例</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.legendShow"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
            v-show="activeElement.legendShow"
            class="panel-row">
            <div class="panel-label">宽度</div>
            <div>
              <input v-model="activeElement.legendWidth">
            </div>
          </div>
          <div
            v-show="activeElement.legendShow"
            class="panel-row">
            <div class="panel-label">文字大小</div>
            <div>
              <input
                v-model="activeElement.legendFontSize"
                type="number" min="8">
            </div>
          </div>
          <div
            v-show="activeElement.legendShow"
            class="panel-row">
            <div class="panel-label">文字颜色</div>
            <div class="panel-value">{{ activeElement.legendTextColor }}</div>
            <div>
              <input
                v-model="activeElement.legendTextColor"
                type="color">
            </div>
          </div>
          <div
            v-show="activeElement.legendShow"
            class="panel-row"
            flex>
            <div class="panel-label">对齐</div>
            <div class="panel-value">
              <label class="radiolabel">
                <input
                  v-model="activeElement.legendPositionX"
                  type="radio"
                  class="inpRadio"
                  name="x"
                  value="left">居左
              </label>
              <label class="radiolabel">
                <input
                  v-model="activeElement.legendPositionX"
                  type="radio"
                  class="inpRadio"
                  name="x"
                  value="center">居中
              </label>
              <label class="radiolabel">
                <input
                  v-model="activeElement.legendPositionX"
                  type="radio"
                  class="inpRadio"
                  name="x"
                  value="right">居右
              </label>
            </div>
          </div>
          <div
            v-show="activeElement.legendShow"
            class="panel-row"
            flex>
            <div class="panel-label"></div>
            <div class="panel-value">
              <label class="radiolabel">
                <input
                  v-model="activeElement.legendPositionY"
                  type="radio"
                  class="inpRadio"
                  name="y"
                  value="top">居上
              </label>
              <label class="radiolabel">
                <input
                  v-model="activeElement.legendPositionY"
                  type="radio"
                  class="inpRadio"
                  name="y"
                  value="center">居中
              </label>
              <label class="radiolabel">
                <input
                  v-model="activeElement.legendPositionY"
                  type="radio"
                  class="inpRadio"
                  name="y"
                  value="bottom">居下
              </label>
            </div>
          </div>
          <div>
            <div
              v-show="activeElement.legendShow"
              class="panel-row">
              <div class="panel-label">图例图标</div>
              <div class="panel-value">
                <select v-model="activeElement.legendIcon">
                  <!--<option>{{activeElement.legendIcon}}</option>-->
                  <option
                    v-for="(val, index) in icon"
                    :key="index" :value="val.value">{{ val.name }}</option>
                </select>
              </div>
            </div>
          </div>
          <div
            v-show="activeElement.legendShow"
            class="panel-row">
            <div class="panel-label">图标宽度</div>
            <div>
              <input
                v-model="activeElement.legendIconWidth"
                type="number" min="1">
            </div>
          </div>
          <div
            v-show="activeElement.legendShow"
            class="panel-row">
            <div class="panel-label">图标高度</div>
            <div>
              <input
                v-model="activeElement.legendIconHeight"
                type="number" min="1">
            </div>
          </div>
          <div
          v-show="activeElement.legendShow"
          class="panel-row">
          <div class="panel-label">图标间距</div>
          <div>
            <input
              v-model="activeElement.legendIconGap"
              type="number" min="0">
          </div>
        </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowItem = !isShowItem" class="panel-item-title">图表样式<i :class="isShowItem ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowItem" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">样式</div>
            <div class="panel-value">
              <select v-model="activeElement.polarType">
                <option value="bar">扇形</option>
                <option value="line">折线</option>
              </select>
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
  name: 'PolarBarChartStyle',
  components: {
    DataSettings,
    BasicSettings
  },
  props: ['activeElement', 'tab'],
  data () {
    return {
      isShowJiao: true,
      isShowJing: true,
      isShowPolar: true,
      isShowLegend: true,
      isShowItem: true,
      icon: [
        {
          name: '无',
          value: 'none'
        }, {
          name: '圆形',
          value: 'circle'
        }, {
          name: '矩形',
          value: 'rect'
        }, {
          name: '线形',
          value: 'line'
        }, {
          name: '圆角矩形',
          value: 'roundRect'
        }, {
          name: '三角形',
          value: 'triangle'
        }, {
          name: '菱形',
          value: 'diamond'
        }, {
          name: '圆形',
          value: 'pin'
        }, {
          name: '箭头',
          value: 'arrow'
        }
      ]
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
