<template>
  <div>
    <div v-show="tab === 1">
      <div style="display: none" class="panel-item-new">
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
      </div>
      <!-- 基础设置 -->
      <basic-settings :activeElement="activeElement"/>
      <div class="panel-item-new">
        <div @click="isShowHead = !isShowHead" class="panel-item-title">表头<i :class="isShowHead ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowHead" class="panel-item-new-set">
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示表头</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showTh"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
            v-show="activeElement.showTh"
            class="panel-row">
            <div class="panel-label">文本颜色</div>
            <div class="panel-value">{{ activeElement.thColor }}</div>
            <div class="panel-value">
              <input
                v-model="activeElement.thColor"
                type="color" >
            </div>
          </div>
          <div
            v-show="activeElement.showTh"
            class="panel-row">
            <div class="panel-label">背景颜色</div>
            <div class="panel-value">{{ activeElement.thBgColor }}</div>
            <div class="panel-value">
              <input
                v-model="activeElement.thBgColor"
                type="color" >
            </div>
          </div>
          <div
            v-show="activeElement.showTh"
            class="panel-row">
            <div class="panel-label">表头高度</div>
            <div class="panel-value">
              <input
                v-model="activeElement.thHeight"
                type="number" >
            </div>
          </div>
          <div
          v-show="activeElement.showTh"
          class="panel-row">
          <div class="panel-label">表头文本</div>
          <div class="panel-value">
            <input
              v-model="activeElement.thFontSize"
              type="number" >
          </div>
        </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowNum = !isShowNum" class="panel-item-title">序号<i :class="isShowNum ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowNum" class="panel-item-new-set">
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示序号</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showNum"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
            v-show="activeElement.showNum"
            class="panel-row">
            <div class="panel-label">序号文字</div>
            <div class="panel-value">
              <input
                v-model="activeElement.thNumText"
                type="text" >
            </div>
          </div>
          <div
            v-show="activeElement.showNum"
            class="panel-row">
            <div class="panel-label">序号大小</div>
            <div class="panel-value">
              <input
                v-model="activeElement.thNumWidth"
                type="number" >
            </div>
          </div>
          <div
            v-show="activeElement.showNum"
            class="panel-row">
            <div class="panel-label">文本大小</div>
            <div class="panel-value">
              <input
                v-model="activeElement.thNumFontSize"
                type="number" >
            </div>
          </div>
          <div
            v-show="activeElement.showNum"
            class="panel-row">
            <div class="panel-label">文本颜色</div>
            <div class="panel-value">{{ activeElement.thNumColor }}</div>
            <div class="panel-value">
              <input
                v-model="activeElement.thNumColor"
                type="color" >
            </div>
          </div>
          <div
            v-show="activeElement.showNum"
            class="panel-row">
            <div class="panel-label">样式</div>
            <div
              class="radioscont">
              <label class="radiolabel">
                <input
                  v-model="activeElement.thNumType"
                  type="radio"
                  class="inpRadio"
                  name="task"
                  value="none">无样式
              </label>
              <label class="radiolabel">
                <input
                  v-model="activeElement.thNumType"
                  type="radio"
                  class="inpRadio"
                  name="task"
                  value="circle">圆形背景
              </label>
            </div>
          </div>
          <div
          v-show="activeElement.showNum && activeElement.thNumType === 'circle'"
          class="panel-row">
          <div class="panel-label">配置颜色</div>
          <div class="panel-setcolor">
            <div
              v-for="(item,index) in activeElement.thNumBg"
              :key="index"
              class="panel-setcolor-item">
              <div class="panel-value-new">{{ item }}</div>
              <div>
                <input
                  v-model="activeElement.thNumBg[index]"
                  type="color">
              </div>
              <button
                v-if="index == 0"
                class="pannel-setcolor-item-btn"
                @click="addthNumBgColor">添加</button>
              <button
                v-else
                class="pannel-setcolor-item-btn"
                @click="delthNumBgColor(index)">删除</button>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowTable = !isShowTable" class="panel-item-title">表格<i :class="isShowTable ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowTable" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">每列占比</div>
            <div class="panel-value">
              <input
                v-model="activeElement.tbPercent"
                type="text" >
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">文本大小</div>
            <div class="panel-value">
              <input
                v-model="activeElement.tbFontSize"
                type="number" >
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">文本颜色</div>
            <div class="panel-value">{{ activeElement.tbColor }}</div>
            <div class="panel-value">
              <input
                v-model="activeElement.tbColor"
                type="color" >
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">对齐方式</div>
            <div class="panel-setcolor">
              <div class="panel-setcolor-item radioscont">
                <div>
                  <label class="radiolabel">
                    <input
                      v-model="activeElement.tbAlign"
                      type="radio"
                      class="inpRadio"
                      name="task"
                      value="left">居左
                  </label>
                </div>
                <div>
                  <label class="radiolabel">
                    <input
                      v-model="activeElement.tbAlign"
                      type="radio"
                      class="inpRadio"
                      name="task"
                      value="center">居中
                  </label>
                </div>
                <div>
                  <label class="radiolabel">
                    <input
                      v-model="activeElement.tbAlign"
                      type="radio"
                      class="inpRadio"
                      name="task"
                      value="right">居右
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">边的宽度</div>
            <div class="panel-value">
              <input
                v-model="activeElement.borderWidth"
                type="number"
                min="0" >
            </div>
          </div>
          <div class="panel-row">
          <div class="panel-label">边的颜色</div>
          <div class="panel-value">{{ activeElement.borderColor }}</div>
          <div>
            <input
              v-model="activeElement.borderColor"
              type="color" >
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
      <div class="panel-row">
        <div class="panel-label">行数</div>
        <div>
          <input
            v-model="activeElement.dataLength"
            type="number"
            min="1">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyEditor from '../../CommonModule/MonacoEditor'
import BasicSettings from '../../CommonModule/BasicSettings'
import axios from 'axios'

export default {
  name: 'BasicTableStyle',
  components: {
    MyEditor, BasicSettings
  },
  props: ['activeElement', 'tab'],
  data () {
    return {
      isShowHead: true,
      isShowNum: true,
      isShowTable: true,
      dataJSON: JSON.stringify(this.activeElement.dataJSON, null, 2),
      selectStatus: '1'
    }
  },
  methods: {
    addthNumBgColor () {
      let params = {
        property: 'thNumBg',
        data: '#0000ff'
      }
      this.$vpd.commit('ADD_COLOR', params)
    },
    delthNumBgColor (index) {
      let params = {
        property: 'thNumBg',
        data: {
          index: index
        }
      }
      this.$vpd.commit('DELETE_COLOR', params)
    },
    handleBind () {
      // console.log("取到的值是"+this.selectStatus);
    },
    refreshAPIurl () { // API 拉取数据
      let url = this.activeElement.dataAPI
      axios({
        type: 'get',
        headers: { 'Content-Type': 'application/json' },
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
        this.$vpd.commit('UPDATE_STATIC_DATA', JSONData)
      })
    },
    inpTime (e) {
      let time = e.target.value
      let param = {
        name: 'dataAPITime',
        value: time
      }
      this.$vpd.commit('UPDATE_WIDGET', param)
      // this.refreshData()
    },
    jsonOnMounted (edit) {
      // console.log(edit);
    },
    jsonOnCodeChange (value, event) {
      this.$vpd.commit('UPDATE_STATIC_DATA', JSON.parse(value))
    }
  }
}
</script>
