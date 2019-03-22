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
      <div class="panel-item-title">容器</div>
      <div class="panel-row">
        <vpd-icon name="maximize" />
        <div class="panel-label">容器名称</div>
        <div class="panel-value">
          <input
            v-model.trim="activeElement.name"
            type="text"
            class="panel-item-input-line"
            placeholder="容器名称必填">
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="grid" />
        <div class="panel-label">display</div>
        <div class="panel-value">
          <select
            v-model="activeElement.display">
            <option>flex</option>
            <option>block</option>
          </select>
        </div>
      </div>
      <div
        v-show="activeElement.display === 'flex'"
        class="panel-row">
        <vpd-icon name="shuffle" />
        <div class="panel-label">主轴方向</div>
        <div class="panel-value">
          <select
            v-model="activeElement.dir">
            <option>row</option>
            <option>row-reverse</option>
            <option>column</option>
            <option>column-reverse</option>
          </select>
        </div>
      </div>
      <div
        v-show="activeElement.display === 'flex'"
        class="panel-row">
        <vpd-icon name="align-justify" />
        <div class="panel-label">主轴分布</div>
        <div class="panel-value">
          <select v-model="activeElement.justify">
            <option>flex-start</option>
            <option>space-between</option>
            <option>center</option>
            <option>space-around</option>
            <option>flex-end</option>
          </select>
        </div>
      </div>
      <div
        v-show="activeElement.display === 'flex'"
        class="panel-row">
        <vpd-icon name="align-center" />
        <div class="panel-label">侧轴分布</div>
        <div class="panel-value">
          <select
            v-model="activeElement.align">
            <option>flex-start</option>
            <option>center</option>
            <option>flex-end</option>
          </select>
        </div>
      </div>
      <hr>
      <div
        class="panel-row"
        style="display: none">
        <vpd-icon name="target" />
        <div class="panel-label">背景色</div>
        <div class="panel-value">{{ activeElement.bgColor }}</div>
        <div class="panel-value">
          <input
            v-model="activeElement.bgColor"
            type="color" >
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="square" />
        <div class="panel-label">圆角</div>
        <div class="panel-value">
          <input
            v-model="activeElement.radius"
            type="text" >
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
