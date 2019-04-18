<template>
  <div>
    <!--<hr>-->
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
      </div>
      <div class="panel-item-new">
        <div class="panel-item-title">基础设置</div>
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
export default {
  name: 'BraidButtonStyle',
  props: ['activeElement', 'tab'],
  methods: {
    addPic () {
      this.$vpd.$emit('upload', (payload) => {
        this.$vpd.commit('addBackPic', payload)
      })
    }
  }
}
</script>
