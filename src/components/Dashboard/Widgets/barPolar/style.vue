<template>
  <div>
    <div v-show="tab === 1">
      <div class="panel-item-new">
        <!--<div class="panel-item-title">基础参数</div>-->
        <div class="panel-row">
          <vpd-icon name="edit-3" />
          <div class="panel-label">宽度</div>
          <div>
            <input
              v-model="activeElement.width"
              type="number">
          </div>
        </div>
        <div class="panel-row">
          <vpd-icon name="edit-3" />
          <div class="panel-label">高度</div>
          <div>
            <input
              v-model="activeElement.height"
              type="number">
          </div>
        </div>
        <div class="panel-row">
          <vpd-icon name="edit-3" />
          <div class="panel-label">横坐标</div>
          <div>
            <input
              v-model="activeElement.left"
              type="number">
          </div>
        </div>
        <div class="panel-row">
          <vpd-icon name="edit-3" />
          <div class="panel-label">纵坐标</div>
          <div>
            <input
              v-model="activeElement.top"
              type="number">
          </div>
        </div>
        <div class="panel-row">
          <vpd-icon name="edit-3" />
          <div class="panel-label">层级</div>
          <div>
            <input
              v-model="activeElement.z"
              type="number">
          </div>
        </div>
        <div v-if="activeElement.isChild">
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
      <div class="panel-item-new">
        <div class="panel-item-title">X 轴</div>
        <div
          class="panel-row"
          flex>
          <vpd-icon name="bold" />
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
          <vpd-icon name="edit-3" />
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
          <vpd-icon name="edit-3" />
          <div class="panel-label">轴线宽度</div>
          <div>
            <input
              v-model="activeElement.xLineWidth"
              type="number">
          </div>
        </div>
        <div class="panel-row"
             flex>
          <vpd-icon name="bold" />
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
          <vpd-icon name="edit-3" />
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
          <vpd-icon name="edit-3" />
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
          <vpd-icon name="edit-3" />
          <div class="panel-label">文字旋转</div>
          <div>
            <input
              v-model="activeElement.xLabelRotate"
              type="number">
          </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div class="panel-item-title">Y 轴</div>
        <div
          class="panel-row"
          flex>
          <vpd-icon name="bold" />
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
          <vpd-icon name="edit-3" />
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
          <vpd-icon name="edit-3" />
          <div class="panel-label">大小调整</div>
          <div>
            <input
              v-model="activeElement.polarSize">
          </div>
        </div>
        <div class="panel-row">
          <vpd-icon name="edit-3" />
          <div class="panel-label">分割段数</div>
          <div>
            <input
              v-model="activeElement.splitNumber"
              type="number"
              min="1">
          </div>
        </div>
        <div class="panel-row">
          <vpd-icon name="edit-3" />
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
    <div v-show="tab === 2">
      <div class="panel-item-new">
        <!--<div class="panel-item-title">数据</div>-->
        <div class="data-group">
          <div
            class="radioscont"
            @click="handleBind">
            <label class="radiolabel">
              <input
                v-model="selectStatus"
                type="radio"
                class="inpRadio"
                name="task"
                value="1">API拉取
            </label>
            <label class="radiolabel">
              <input
                v-model="selectStatus"
                type="radio"
                class="inpRadio"
                name="task"
                value="2">静态JSON
            </label>
          </div>
          <div class="radiowrap">
            <div v-if="selectStatus =='1'">
            <textarea
              v-model="activeElement.dataAPI"
              cols="30"
              rows="3"
              placeholder="$CUR_HOST/openapi/demo/chart?type=sellGoods"/>
              <p>可使用示例API：XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <button class="btn-small">调试</button>
              <button
                class="btn-small"
                @click="refreshAPIurl">刷新图表</button>
              <div
                class="panel-row"
                flex>
                <vpd-icon name="bold" />
                <div class="panel-label">自动刷新</div>
                <div class="panel-value">
                  <label class="form-switch">
                    <input
                      v-model="activeElement.dataAPIAuto"
                      type="checkbox" >
                    <i class="form-icon"/>
                  </label>
                </div>
              </div>
              <div
                v-if="activeElement.dataAPIAuto"
                class="panel-row">
                <vpd-icon name="edit-3" />
                <div class="panel-label">时间间隔</div>
                <div>
                  <input
                    :value="activeElement.dataAPITime"
                    type="number"
                    @input="inpTime($event)">
                </div>
              </div>
              <p>数据的自动刷新在非编辑模式下有效，最小刷新间隔为10秒<span style="color:red">未完成</span></p>
            </div>
            <div v-if="selectStatus =='2'">
              <div>
                <MyEditor
                  :language="'json'"
                  :codes="JSON.stringify(activeElement.dataJSON, null, 2)"
                  @onMounted="jsonOnMounted"
                  @onCodeChange="jsonOnCodeChange" />
                <!--<button
                class="btn-small"
                @click="refreshMonaco">刷新数据</button>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="tab === 3">
      <div class="panel-item-new">
        <div class="panel-item-title">图例设置</div>
        <div
          class="panel-row"
          flex>
          <vpd-icon name="bold" />
          <div class="panel-label">显示图例</div>
          <div class="panel-value">
            <label class="form-switch">
              <input
                v-model="activeElement.showLengend"
                type="checkbox" >
              <i class="form-icon"/>
            </label>
          </div>
        </div>
        <div
          v-show="activeElement.showLengend"
          class="panel-row">
          <vpd-icon name="edit-3" />
          <div class="panel-label">宽度</div>
          <div>
            <input v-model="activeElement.lengendWidth">
          </div>
        </div>
        <div class="panel-row" style="display: none">
          <vpd-icon name="edit-3" />
          <div class="panel-label">高度</div>
          <div>
            <input v-model="activeElement.lengendHeight">
          </div>
        </div>
        <div class="panel-row" style="display: none" flex>
          <vpd-icon name="align-justify" />
          <div class="panel-label">对齐</div>
          <div class="panel-value">
            <label class="radiolabel">
              <input
                v-model="activeElement.lengendPositionX"
                type="radio"
                class="inpRadio"
                name="task"
                value="left">居左
            </label>
            <label class="radiolabel">
              <input
                v-model="activeElement.lengendPositionX"
                type="radio"
                class="inpRadio"
                name="task"
                value="right">居右
            </label>
          </div>
        </div>
        <div class="panel-row" style="display: none" flex>
          <vpd-icon name="align-justify" />
          <div class="panel-label"></div>
          <div class="panel-value">
            <label class="radiolabel">
              <input
                v-model="activeElement.lengendPositionY"
                type="radio"
                class="inpRadio"
                name="task"
                value="top">居上
            </label>
            <label class="radiolabel">
              <input
                v-model="activeElement.lengendPositionY"
                type="radio"
                class="inpRadio"
                name="task"
                value="bottom">居下
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vpd from '@/components/Dashboard/Designer/mixins/vpd'
import MyEditor from '@/components/Dashboard/Designer/common/monacoEditor'
import axios from 'axios'
export default {
  name: 'BraidBarPolarStyle',
  components: {
    MyEditor
  },
  mixins: [vpd],
  props: ['activeElement', 'tab'],
  data () {
    return {
      dataJSON: JSON.stringify(this.activeElement.dataJSON, null, 2),
      selectStatus: '1'
    }
  },
  mounted () {

  },
  computed: {
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
    addPic () {
      this.$vpd.$emit('upload', (payload) => {
        this.$vpd.commit('addBackPic', payload)
      })
    },
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
        property: 'colorArr',
        data: '#0000ff'
      }
      this.$vpd.commit('addColor', params)
    },
    delLGColor (index) {
      let params = {
        property: 'colorArr',
        data: {
          index: index
        }
      }
      this.$vpd.commit('delColor', params)
    },
    handleBind () {
      // console.log("取到的值是"+this.selectStatus);
    },
    refreshAPIurl () { // API 拉取数据
      let url = this.activeElement.dataAPI
      axios({
        type: 'get',
        headers: {'Content-Type': 'application/json'},
        url: url
      }).then(res => {
        let data = res.data.data
        let JSONData = {
          status: 0,
          msg: '',
          data: {
            categories: [],
            series: []
          }
        }
        for (let i in data) {
          JSONData.data.categories.push(data[i].unit)
          JSONData.data.series.push(data[i].schedule)
        }
        this.$vpd.commit('updataJSON', JSONData)
      })
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
