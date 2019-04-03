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
      <div class="panel-item-title">表头</div>
      <div
        class="panel-row"
        flex>
        <vpd-icon name="bold" />
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
        <vpd-icon name="square" />
        <div class="panel-label">列数比例</div>
        <div class="panel-value">
          <input
            v-model="activeElement.tbPercent"
            type="text" >
        </div>
      </div>
      <div
        v-show="activeElement.showTh"
        class="panel-row">
        <vpd-icon name="target" />
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
        <vpd-icon name="target" />
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
        <vpd-icon name="square" />
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
        <vpd-icon name="square" />
        <div class="panel-label">表头文本</div>
        <div class="panel-value">
          <input
            v-model="activeElement.thFontSize"
            type="number" >
        </div>
      </div>
    </div>
    <div class="panel-item-new">
      <div class="panel-item-title">序号</div>
      <div
        class="panel-row"
        flex>
        <vpd-icon name="bold" />
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
      <div class="panel-row">
        <vpd-icon name="square" />
        <div class="panel-label">序号大小</div>
        <div class="panel-value">
          <input
            v-model="activeElement.thNumWidth"
            type="number" >
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="square" />
        <div class="panel-label">文本大小</div>
        <div class="panel-value">
          <input
            v-model="activeElement.thNumFontSize"
            type="number" >
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="target" />
        <div class="panel-label">文本颜色</div>
        <div class="panel-value">{{ activeElement.thNumColor }}</div>
        <div class="panel-value">
          <input
            v-model="activeElement.thNumColor"
            type="color" >
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="target" />
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
      <div v-show="activeElement.thNumType === 'circle'" class="panel-row">
        <vpd-icon name="edit-3" />
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
    <div class="panel-item-new">
      <div class="panel-item-title">表格</div>
      <div class="panel-row">
        <vpd-icon name="square" />
        <div class="panel-label">文本大小</div>
        <div class="panel-value">
          <input
            v-model="activeElement.tbFontSize"
            type="number" >
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="target" />
        <div class="panel-label">文本颜色</div>
        <div class="panel-value">{{ activeElement.tbColor }}</div>
        <div class="panel-value">
          <input
            v-model="activeElement.tbColor"
            type="color" >
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="edit-3" />
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
        <vpd-icon name="maximize" />
        <div class="panel-label">边的宽度</div>
        <div class="panel-value">
          <input
            v-model="activeElement.borderWidth"
            type="text" >
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="edit-3" />
        <div class="panel-label">边的颜色</div>
        <div class="panel-value">{{ activeElement.borderColor }}</div>
        <div>
          <input
            v-model="activeElement.borderColor"
            type="color" >
        </div>
      </div>
    </div>
    <div class="panel-item-new">
      <div class="panel-item-title">背景</div>
      <div class="panel-item-detail">
        <div class="xf-background">
          <ul class="f-clearfix set-bgnav">
            <li
              v-for="item in backgroundCss"
              :class="[activeElement.bgType == item.role ? ' square-box-active' : '']"
              :key="item.role"
              :data-role="item.role"
              class="square-box"
              @click="changeBackgroundCss(item.role)">
              {{ item.value }}
            </li>
          </ul>
          <!-- 背景填充方式下拉框 end -->
          <ul class="tab-content">
            <!-- 纯色填充样式设置 begin -->
            <li
              v-show="activeElement.bgType == 'bgColor'"
              class="">
              <div class="panel-row">
                <div class="panel-label">背景色</div>
                <div class="panel-value">{{ activeElement.bgColor }}</div>
                <div class="panel-value">
                  <el-color-picker
                    v-model="activeElement.bgColor"
                    show-alpha />
                </div>
              </div>
            </li>
            <!-- 渐变填充样式设置 begin -->
            <li
              v-show="activeElement.bgType == 'bgGradientcolor'"
              class=""
              role="tabpanel">
              <div class="panel-row">
                <div class="panel-label">颜色</div>
                <div class="panel-value-new">
                  <el-color-picker
                    v-model="activeElement.bgGradientcolor1"
                    show-alpha />
                </div>& &nbsp;&nbsp;&nbsp;
                <div class="panel-value-new">
                  <el-color-picker
                    v-model="activeElement.bgGradientcolor2"
                    show-alpha/>
                </div>
              </div>
              <div class="panel-row">
                <div class="panel-label">方向</div>
                <div class="panel-value">
                  <input
                    v-model="activeElement.bgGradientdir1"
                    type="text"
                    placeholder="top bottom left right 180deg" >
                </div>
              </div>
            </li>
            <!-- 图片填充样式设置 begin -->
            <li
              v-show="activeElement.bgType == 'bgImage'"
              class=""
              role="tabpanel">
              <div class="panel-row">
                <vpd-icon name="image" />
                <div class="panel-label">背景图</div>
                <div class="panel-value">
                  <div
                    :style="{ backgroundImage: 'url(' + activeElement.backPic + '), background: #eeeeee' }"
                    class="panel-preview"
                    @click="addPic">
                    点击上传
                    <vpd-icon
                      v-show="!activeElement.backPic"
                      name="plus"/>
                  </div>
                </div>
              </div>
            </li>
            <!-- 无填充 begin -->
            <li
              v-show="activeElement.bgType == 'bgNone'"
              class=""
              role="tabpanel">
              无填充
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vpd from '@/components/Dashboard/Designer/mixins/vpd'
export default {
  name: 'BraidTable',
  mixins: [vpd],
  props: ['activeElement'],
  data () {
    return {
      backgroundCss: [{
        role: 'bgColor',
        value: '纯色'
      }, {
        role: 'bgGradientcolor',
        value: '渐变'
      }, {
        role: 'bgImage',
        value: '图片'
      }, {
        role: 'bgNone',
        value: '无'
      }]
    }
  },
  methods: {
    addPic () {
      this.$vpd.$emit('upload', (payload) => {
        this.$vpd.commit('addContainerBackPic', payload)
      })
    },
    changeBackgroundCss (role) {
      this.activeBackgroundCss = role
      let param = {
        name: 'bgType',
        value: role
      }
      this.$vpd.commit('updataData', param)
    },
    addthNumBgColor () {
      let params = {
        property: 'thNumBg',
        data: '#0000ff'
      }
      this.$vpd.commit('addColor', params)
    },
    delthNumBgColor (index) {
      let params = {
        property: 'thNumBg',
        data: {
          index: index
        }
      }
      this.$vpd.commit('delColor', params)
    }
  }
}
</script>
<style>
  .panel-item-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    background-color: #f5f7fa;
    border-bottom: 1px solid #e6eaf1;
  }
  .panel-item-detail {
    display: flex;
    font-size: 13px;
    line-height: 30px;
    padding:12px;
  }
  .panel-item-detail-left ,.panel-item-detail-right {
    display: flex;
  }
  .panel-item-detail span {
    padding:0 12px;
  }
  .panel-item-new .panel-item-detail .panel-item-input-line {
    margin:0 12px;
    width:260px;
    height:30px;
  }
  .panel-item-new .panel-item-detail .panel-item-detail-left input,.panel-item-new .panel-item-detail .panel-item-detail-right input {
    width:100px;
    height:30px;
  }
  .xf-background {
    width:100%;
  }
  .xf-background ul {
    overflow: hidden;
    padding:0;
    margin:0;
  }
  .square-box {
    float: left;
    width:20%;
    text-align: center;
  }
  .square-box-active {
    border-bottom:1px solid #42b983;
  }
  .xf-background .tab-content{
    margin-top:20px;
  }
  .panel-preview{
    width:70px;
    background-color:#eee;
    text-align: center;
    line-height: 32px;
  }
</style>
