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
    <div v-show="tab === 2">
      <div class="panel-item-new">
        <!--<div class="panel-item-title">数据</div>-->
        <div class="data-group">
          <div
            class="radioscont"
            @click="handleBind">
            <label class="radiolabel">
              <input
                v-model="activeElement.selectStatus"
                type="radio"
                class="inpRadio"
                name="task"
                value="api">API拉取
            </label>
            <label class="radiolabel">
              <input
                v-model="activeElement.selectStatus"
                type="radio"
                class="inpRadio"
                name="task"
                value="json">静态JSON
            </label>
          </div>
          <div class="radiowrap">
            <div v-if="activeElement.selectStatus =='api'">
            <textarea
              v-model="activeElement.dataAPI"
              cols="30"
              rows="3"
              placeholder="$CUR_HOST/openapi/demo/chart?type=sellGoods"/>
              <p>可使用示例API：XXXXXXXXXXXXXXXXXXXXXXXXX</p>
              <button class="btn-small" style="display: none">调试</button>
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
            <div v-if="tab === 2 && activeElement.selectStatus =='json'">
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

    </div>
  </div>
</template>

<script>
import vpd from '@/components/Dashboard/Designer/mixins/vpd'
import MyEditor from '@/components/Dashboard/Designer/common/monacoEditor'
import axios from 'axios'
export default {
  name: 'BraidProgressBarStyle',
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
    jsonOnMounted (edit) {
      // console.log(edit)
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
    handleBind (e) {
      let activeStr = e.target.defaultValue
      let params = {
        name: 'selectStatus',
        value: activeStr
      }
      this.$vpd.commit('updataData', params)
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
