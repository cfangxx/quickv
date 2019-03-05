<template>
  <v-echart
    :class="[playState ? 'anm-' + val.animationName : '']"
    :style="{
      position: 'absolute',
      width: val.width / 7.5 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / 7.5 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
    }"
    :options="axisData"
    :auto-resize="true"
    contenteditable="true"
    @blur="(e) => updateText(e, val.uuid)"/>
</template>

<script>
import stylec from './style.vue'
const WIDGET_NAME = 'line-chart'

let newVar = {
  name: WIDGET_NAME,
  // component: {'chart': ECharts},
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>',
  title: '折线图',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    name: '',
    width: 600,
    height: 600,
    left: 50,
    top: 0,
    z: 0,
    axisData: '820, 932, 901, 934, 1290, 1330, 1320',
    backPic: '',
    backPicUrl: '',
    color: '#ffffff',
    text: '按钮',
    belong: 'page',
    animationName: ''
  },
  props: ['h', 'val', 'playState'],
  data () {
    return {}
  },
  computed: {
    axisData () {
      return {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.val.axisData.split(','),
          type: 'line',
          smooth: true
        }]
      }
    }
  },
  methods: {
    updateText (e, uuid) {
      let text = e.target.innerHTML
      this.$vpd.commit('updateData', {
        uuid: uuid,
        key: 'text',
        value: text
      })
    }
  }
}
export default newVar

</script>

<style scoped>
  .lz-container {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
</style>
