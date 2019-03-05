<template>
  <div>
    <hr>
    <div class="panel-row">
      <vpd-icon name="edit-3" />
      <div class="panel-label">数据源</div>
      <div>
        <input
          v-model="activeElement.axisData">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LineChartStyle',
  props: ['activeElement'],
  methods: {
    addPic () {
      this.$vpd.$emit('upload', (payload) => {
        this.$vpd.commit('addBackPic', payload)
      })
    }
  }
}
</script>
