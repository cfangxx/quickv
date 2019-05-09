<template>
  <div class="panel-item-new">
    <div class="panel-item-title">基础设置</div>
    <div class="panel-row">
      <div class="panel-label">名称</div>
      <div>
        <input
          v-model="activeElement.name"
          type="text">
      </div>
    </div>
    <div class="panel-row">
      <div class="panel-label">描述</div>
      <div>
        <textarea
          v-model="activeElement.desc"/>
      </div>
    </div>
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
    <div v-if="activeElement.isChild" v-show="false">
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
</template>

<script>
// import vpd from '@/components/Dashboard/Designer/mixins/vpd'

export default {
  name: 'WidgetBasicSettings',
  // mixins: [vpd],
  props: ['activeElement'],
  computed: {
    containerName () {
      var arr = []
      // this.$vpd.state.widgets.map(
      //   val => val.isContainer && val.name && arr.push(val.name)
      // )
      return arr
    }
  }
}
</script>
