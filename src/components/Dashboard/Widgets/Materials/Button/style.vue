<template>
  <div>
    <!--<hr>-->
    <div v-show="tab === 1">
      <basic-settings :activeElement="activeElement"/>

      <div class="panel-item-new">
        <div class="panel-item-title">样式</div>
        <div class="panel-row">
          <div class="panel-label">按钮文本</div>
          <div>
            <input
              v-model="activeElement.text">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">文本大小</div>
          <div>
            <input
              v-model="activeElement.fontSize"
              type="number"
              min="6">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">文本颜色</div>
          <div class="panel-value">{{ activeElement.color }}</div>
          <div>
            <input
              v-model="activeElement.color"
              type="color">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">背景颜色</div>
          <div class="panel-value">{{ activeElement.bgColor }}</div>
          <div class="panel-value">
            <input
              v-model="activeElement.bgColor"
              type="color">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">圆角大小</div>
          <div>
            <input
              v-model="activeElement.borderRadius"
              type="number"
              min="0">
          </div>
        </div>
      </div>

      <div style="display: none" class="panel-item-new">
        <div class="panel-item-title">悬停设置</div>
        <div class="panel-row">
          <div class="panel-label">文本颜色</div>
          <div class="panel-value">{{ activeElement.colorHover }}</div>
          <div>
            <input
              v-model="activeElement.colorHover"
              type="color">
          </div>
        </div>
        <div class="panel-row">
          <div class="panel-label">背景颜色</div>
          <div class="panel-value">{{ activeElement.bgColorHover }}</div>
          <div class="panel-value">
            <input
              v-model="activeElement.bgColorHover"
              type="color">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicSettings from '../../CommonModule/BasicSettings'

export default {
  name: 'BraidButtonStyle',
  components: {
    BasicSettings
  },
  props: ['activeElement', 'tab'],
  methods: {
    addPic () {
      this.$vpd.$emit('upload', (payload) => {
        this.$vpd.commit('ADD_BACKGROUND_IMAGE', payload)
      })
    }
  }
}
</script>
