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
        <div @click="isShowTITLE = !isShowTITLE" class="panel-item-title">标题设置<i :class="isShowTITLE ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowTITLE" class="panel-item-new-set">
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示标题</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showTitle"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div v-show="activeElement.showTitle" class="panel-row">
            <div class="panel-label">标题文本</div>
            <div>
              <input
                v-model="activeElement.chartTitle"
                type="text">
            </div>
          </div>
          <div v-show="activeElement.showTitle" class="panel-row">
            <div class="panel-label">标题颜色</div>
            <div class="panel-value">{{ activeElement.titleColor }}</div>
            <div>
              <input
                v-model="activeElement.titleColor"
                type="color">
            </div>
          </div>
          <div v-show="activeElement.showTitle" class="panel-row">
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
            class="panel-row"
            flex>
            <div class="panel-label">对齐</div>
            <div class="panel-value">
              <label class="radiolabel">
                <input
                  v-model="activeElement.titleX"
                  type="radio"
                  class="inpRadio"
                  name="x"
                  value="left">居左
              </label>
              <label class="radiolabel">
                <input
                  v-model="activeElement.titleX"
                  type="radio"
                  class="inpRadio"
                  name="x"
                  value="center">居中
              </label>
              <label class="radiolabel">
                <input
                  v-model="activeElement.titleX"
                  type="radio"
                  class="inpRadio"
                  name="x"
                  value="right">居右
              </label>
            </div>
          </div>
          <div
            v-show="activeElement.showTitle"
            class="panel-row"
            flex>
            <div class="panel-label"></div>
            <div class="panel-value">
              <label class="radiolabel">
                <input
                  v-model="activeElement.titleY"
                  type="radio"
                  class="inpRadio"
                  name="y"
                  value="top">居上
              </label>
              <label class="radiolabel">
                <input
                  v-model="activeElement.titleY"
                  type="radio"
                  class="inpRadio"
                  name="y"
                  value="center">居中
              </label>
              <label class="radiolabel">
                <input
                  v-model="activeElement.titleY"
                  type="radio"
                  class="inpRadio"
                  name="y"
                  value="bottom">居下
              </label>
            </div>
          </div>
          <div v-show="activeElement.showTitle" class="panel-row">
            <div class="panel-label">副标题文本</div>
            <div>
              <input
                v-model="activeElement.titleSubText"
                type="text">
            </div>
          </div>
          <div v-show="activeElement.showTitle" class="panel-row">
            <div class="panel-label">副标题颜色</div>
            <div class="panel-value">{{ activeElement.titleSubColor }}</div>
            <div>
              <input
                v-model="activeElement.titleSubColor"
                type="color">
            </div>
          </div>
          <div v-show="activeElement.showTitle" class="panel-row">
            <div class="panel-label">副文本大小</div>
            <div>
              <input
                v-model="activeElement.titleSubFontSize"
                type="number"
                min="0">
            </div>
          </div>
        </div>
      </div>
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
                v-model="activeElement.autoToolTipTime"> ms
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
      isShowLegend: true,
      isShowBarItem: true,
      isShowTooltip: true,
      isShowTITLE: true,
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
