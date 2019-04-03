<template>
  <div>
    <hr>
    <div class="panel-item-new">
      <div class="panel-item-title">基础参数</div>
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
    </div>
    <div class="panel-item-new">
      <div class="panel-item-title">{{activeElement.xyturn ? 'Y 轴' : 'X 轴'}}</div>
      <div class="panel-row">
        <vpd-icon name="edit-3" />
        <div class="panel-label">文本颜色</div>
        <div class="panel-value">{{ activeElement.xTextColor }}</div>
        <div>
          <input
            v-model="activeElement.xTextColor"
            type="color">
        </div>
      </div>
      <div class="panel-row">
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
        class="panel-row"
        flex>
        <vpd-icon name="bold" />
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
        class="panel-row"
        v-show="activeElement.showXaxisTick"
        flex>
        <vpd-icon name="bold" />
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
      <div class="panel-item-title">{{activeElement.xyturn ? 'X 轴' : 'Y 轴'}}</div>
      <div class="panel-row">
        <vpd-icon name="edit-3" />
        <div class="panel-label">文本颜色</div>
        <div class="panel-value">{{ activeElement.yTextColor }}</div>
        <div>
          <input
            v-model="activeElement.yTextColor"
            type="color">
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="edit-3" />
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
        <vpd-icon name="bold" />
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
        <vpd-icon name="bold" />
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
        <vpd-icon name="bold" />
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
        <vpd-icon name="bold" />
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
      <div class="panel-row">
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
        <div class="panel-label">上边距</div>
        <div>
          <input
            v-model="activeElement.gridTop">
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="edit-3" />
        <div class="panel-label">下边距</div>
        <div>
          <input
            v-model="activeElement.gridBottom">
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="edit-3" />
        <div class="panel-label">左边距</div>
        <div>
          <input
            v-model="activeElement.gridLeft">
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="edit-3" />
        <div class="panel-label">右边距</div>
        <div>
          <input
            v-model="activeElement.gridRight">
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="edit-3" />
        <div class="panel-label">标题</div>
        <div>
          <input
            v-model="activeElement.chartTitle">
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="edit-3" />
        <div class="panel-label">标题颜色</div>
        <div class="panel-value">{{ activeElement.titleColor }}</div>
        <div>
          <input
            v-model="activeElement.titleColor"
            type="color">
        </div>
      </div>
      <div
        class="panel-row"
        flex>
        <vpd-icon name="bold" />
        <div class="panel-label">X/Y轴翻转</div>
        <div class="panel-value">
          <label class="form-switch">
            <input
              v-model="activeElement.xyturn"
              type="checkbox" >
            <i class="form-icon"/>
          </label>
        </div>
      </div>
    </div>
    <div class="panel-item-new">
      <div class="panel-item-title">柱体设置</div>
      <div class="panel-row">
        <vpd-icon name="edit-3" />
        <div class="panel-label">宽度</div>
        <div>
          <input v-model="activeElement.seriseBarWidth">
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="edit-3" />
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
        <vpd-icon name="edit-3" />
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
    <hr>
    <div class="panel-item-new">
      <div class="panel-item-title">数据</div>
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
</template>

<script>
import vpd from '@/components/Dashboard/Designer/mixins/vpd'
import MyEditor from '@/components/Dashboard/Designer/common/monacoEditor'
import axios from 'axios'
export default {
  name: 'BraidLineChartStyle',
  components: {
    MyEditor
  },
  mixins: [vpd],
  props: ['activeElement'],
  data () {
    return {
      dataJSON: JSON.stringify(this.activeElement.dataJSON, null, 2),
      selectStatus: '1'
    }
  },
  mounted () {

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

  .btn-small {
    width:120px;
    height:36px;
    margin:20px 0;
    background-color: #42b966;
    color:#fff;
    font-size:16px;
    border:none;
    cursor: pointer;
  }
  .btn-small:hover {
    background-color: #42b983;
  }
  .data-group{
    padding:0 15px;
  }
  .radiowrap{

  }
</style>
