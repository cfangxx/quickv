<template>
  <div>
    <div v-show="tab === 1">
      <div class="panel-item-new">
        <!--<div class="panel-item-title">基础参数</div>-->
        <div class="panel-row">
          <div class="panel-label">宽度</div>
          <div>
            <input
              v-model="activeElement.width"
              type="number">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">高度</div>
          <div>
            <input
              v-model="activeElement.height"
              type="number">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">横坐标</div>
          <div>
            <input
              v-model="activeElement.left"
              type="number">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">纵坐标</div>
          <div>
            <input
              v-model="activeElement.top"
              type="number">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">层级</div>
          <div>
            <input
              v-model="activeElement.z"
              type="number">
          </div>
        </div>
        <div v-if="activeElement.isChild">
          <div class="panel-row">
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
      <div class="panel-item-new">
        <div class="panel-item-title">{{activeElement.xyturn ? 'Y 轴' : 'X 轴'}}</div>
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

      </div>
      <div class="panel-item-new">
        <div class="panel-item-title">{{activeElement.xyturn ? 'X 轴' : 'Y 轴'}}</div>
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
        <div class="panel-item-title">相关配置</div>
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
        <div class="panel-row">
          <div class="panel-label">折线宽度</div>
          <div>
            <input
              v-model="activeElement.seriesLineWidth"
              type="number"
              min="0">
          </div>
        </div>
        <div
          class="panel-row"
          flex>
          <div class="panel-label">折线平滑</div>
          <div class="panel-value">
            <label class="form-switch">
              <input
                v-model="activeElement.isSmooth"
                type="checkbox" >
              <i class="form-icon"/>
            </label>
          </div>
        </div>
        <div>
          <div class="panel-row">
            <div class="panel-label">拐点图形</div>
            <div class="panel-value">
              <select v-model="activeElement.seriesSymbol">
                <!--<option>{{activeElement.legendIcon}}</option>-->
                <option
                  v-for="(val, index) in icon"
                  :key="index" :value="val.value">{{ val.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div
          v-show="activeElement.seriesSymbol !== 'none'"
          class="panel-row">
          <div class="panel-label">拐点大小</div>
          <div>
            <input
              v-model="activeElement.seriesSymbolSize"
              type="number"
              min="0">
          </div>
        </div>
      </div>
    </div>
    <div v-if="tab === 2">
      <div class="panel-item-new">
        <!--<div class="panel-item-title">数据</div>-->
        <div class="data-group">
          <div
            class="radioscont">
            <label class="radiolabel">
              <input
                v-model="activeElement.dataOrigin"
                type="radio"
                class="inpRadio"
                name="task"
                value="api">API拉取
            </label>
            <label class="radiolabel">
              <input
                v-model="activeElement.dataOrigin"
                type="radio"
                class="inpRadio"
                name="task"
                value="local">静态JSON
            </label>
          </div>
          <div class="radiowrap">
            <div v-if="dataOrigin == 'api'">
              <textarea
                v-model="activeElement.dataAPI"
                cols="30"
                rows="3"
                placeholder="$CUR_HOST/openapi/demo/chart?type=sellGoods"/>

              <p>可使用示例API：</p>
              <textarea cols="30" rows="2" style="border:none" readonly>https://mock.kunteng.org.cn/mock/5ca2cba34918866472494a14/barchart</textarea>
              <br/>
              <div
                class="panel-row"
                flex>
                <el-button type="success" @click="activeElement.dataRefresh = !activeElement.dataRefresh">刷新图表</el-button>
                <div class="panel-label">自动刷新</div>
                <div class="panel-value">
                  <label class="form-switch">
                    <input
                      v-model="activeElement.dataAutoRefresh"
                      type="checkbox" >
                    <i class="form-icon"/>
                  </label>
                </div>
              </div>
              <div
                v-if="activeElement.dataAutoRefresh"
                class="panel-row">
                <div class="panel-label">时间间隔</div>
                <div>
                  <input
                    :value="activeElement.dataRefreshTime"
                    type="number"
                    @input="inpTime($event)"
                    min="5">
                </div>
              </div>
              <p>数据的自动刷新最小间隔为5秒</p>
            </div>
            <div v-if="dataOrigin == 'local'">
              <json-editor
                :codes="localData"
                @onCodeChange="jsonOnCodeChange" />
              <!-- <button class="btn-small" @click="refreshMonaco">刷新数据</button> -->
            </div>
          </div>
        </div>
      </div>
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
      <div
        class="panel-row"
        flex>
        <div class="panel-label">显示提示框</div>
        <div class="panel-value">
          <label class="form-switch">
            <input
              v-model="activeElement.showTooltip"
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
import jsonEditor from '@/components/Dashboard/Designer/common/monacoEditor'
export default {
  name: 'BraidLineChartStyle',
  components: {
    jsonEditor
  },
  mixins: [vpd],
  props: ['activeElement', 'tab'],
  data () {
    return {
      icon: [
        {
          name: '无',
          value: 'none'
        }, {
          name: '圆形',
          value: 'circle'
        }, {
          name: '矩形',
          value: 'rectangle'
        }, {
          name: '三角形',
          value: 'triangle'
        }, {
          name: '空心圆',
          value: 'emptyCircle'
        }, {
          name: '菱形',
          value: 'diamond'
        }, {
          name: '标注',
          value: 'pin'
        }, {
          name: '箭头',
          value: 'arrow'
        }
      ],
      dataJSON: JSON.stringify(this.activeElement.dataJSON, null, 2),
      selectStatus: '1'
    }
  },
  mounted () {
    // console.log(this.activeElement)
  },
  computed: {
    dataOrigin () {
      return this.activeElement.dataOrigin
    },
    localData () {
      return JSON.stringify(this.activeElement.dataJSON, null, 2)
    },
    // 容器名称
    containerName () {
      var arr = []
      this.$vpd.state.widgets.map(
        val => val.isContainer && val.name && arr.push(val.name)
      )

      return arr
    }
  },
  methods: {
    jsonOnMounted (edit) {
      // console.log(edit);
    },
    jsonOnCodeChange (value, event) {
      this.$vpd.commit('updataJSON', JSON.parse(value))
    },
    refreshMonaco () {

    },
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
    },
    handleBind () {
      // console.log("取到的值是"+this.selectStatus);
    },
    inpTime (e) {
      let time = e.target.value
      let param = {
        name: 'dataAPITime',
        value: time
      }
      this.$vpd.commit('updataData', param)
      // this.refreshData()
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
