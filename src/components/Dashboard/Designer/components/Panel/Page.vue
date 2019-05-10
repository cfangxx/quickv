<template>
  <div
    v-if="activeElement.page && tab === 1"
    class="panel-wrap">
    <div
      class="panel-row"
      flex>
      <div class="panel-label">大屏名称</div>
      <div class="panel-value">
        <input
          v-model="activeElement.title"
          type="text">
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <div class="panel-label">大屏简介</div>
      <div class="panel-value">
        <textarea
          v-model="activeElement.about">
        </textarea>
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <div class="panel-label">页面宽度</div>
      <div class="panel-value">
        <input
          v-model="activeElement.width"
          type="number">
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <div class="panel-label">页面高度</div>
      <div class="panel-value">
        <input
          v-model="activeElement.height"
          type="number">
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <div class="panel-label">页面背景色</div>
      <div class="panel-value">
        <input
          v-model="activeElement.backgroundColor"
          type="color">
      </div>
    </div>
    <div class="panel-row">
      <div class="panel-label">背景图</div>
      <div class="panel-value">
        <div
          :style="{ backgroundImage: activeElement.backPic}"
          class="panel-preview pic-updata-btn"
          @click="addPic">
          点击上传
          <vpd-icon
            v-show="!activeElement.backPic"
            name="plus"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vpd from '../../mixins/vpd'
export default {
  mixins: [vpd],
  props: ['activeElement', 'tab'],
  methods: {
    addPic () {
      this.$vpd.$emit('upload', (payload) => {
        this.$vpd.commit('ADD_PAGE_BACKGROUND_IMAGE', payload)
      })
    }
  }
}
</script>
<style>
  .pic-updata-btn{
    width:60px;
  }
</style>
