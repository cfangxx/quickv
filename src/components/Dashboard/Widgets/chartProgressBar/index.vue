<template>
  <div
    :class="[playState ? 'anm-' + val.animationName : '']"
    :style="{
      position: 'absolute',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / w * 100 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      backgroundColor: val.bgColor,
      color: val.color
    }"
    contenteditable="true">
    <v-echart
      :options="options"
      autoresize/>
  </div>
</template>

<script>
import stylec from './style.vue'
import echarts from 'echarts/lib/echarts'
const WIDGET_NAME = 'braid-progressBar'
export default {
  name: WIDGET_NAME,
  group: 'indicator',
  icon: require('./icon/thumb-progressBar.png'),
  title: '环形进度条',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    name: '11',
    width: 160,
    height: 160,
    left: 50,
    top: 50,
    z: 0,
    color: '#555555',
    text: '环形进度条',
    belong: 'page',
    animationName: '',

    chartTitle: '销量', // 图表标题
    textStyleColor: '#fc8700', // 文本颜色
    showTitle: true, // 显示文本
    titleColor: '#fc8700', // 标题颜色
    titleFontSize: 24,

    lgArr: [{ // 设置渐变颜色数组
      color: '#fc8700',
      offset: 0
    }, {
      color: '#ba3ba3',
      offset: 1
    }],

    colorArr: ['#fc8700', '#eeeeee'],
    isLinear: true, // 圆环是否渐变
    seriesRadius: ['78%', '90%'], // 圆环大小
    selectStatus: 'json',

    dataAPI: 'http://192.168.159.2:7300/mock/5c88c1401cbd339a508e7ef4/czjx', // API拉取地址
    dataAPIAuto: false, // 是否自动刷新
    dataAPITime: 5, // 自动刷新间隔（秒）
    dataJSON: {
      'status': 0,
      'msg': '',
      'data': 80
    }
  },
  props: ['w', 'h', 'val', 'playState'],
  data () {
    return {

    }
  },
  computed: {
    options () {
      return {
        title: {
          show: this.val.showTitle,
          text: this.val.dataJSON.data + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: this.val.titleFontSize,
            color: this.val.titleColor,
            fontWeight: 'normal'
          }
        },
        color: this.val.colorArr,
        series: [{
          name: '',
          type: 'pie',
          radius: this.val.seriesRadius,
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false
            }
          },
          data: [
            {
              value: this.val.dataJSON.data,
              name: '',
              itemStyle: {
                normal: {
                  color: this.val.isLinear ? new echarts.graphic.LinearGradient(0, 0, 0, 1, this.val.lgArr) : this.val.colorArr[0]
                }
              }
            },
            {
              value: 100 - this.val.dataJSON.data,
              name: '',
              itemStyle: {
                normal: {
                  color: this.val.colorArr[1]
                }
              }
            }
          ]
        }]
      }
    }

  },
  mounted () {

  },
  methods: {
    changeData () {
      let data = []
      for (let i = 0, min = 5, max = 99; i < 6; i++) {
        data.push(Math.floor(Math.random() * (max + 1 - min) + min))
      }
      this.options.legend.data = data
      setTimeout(this.changeData, 2000)
    },
    updateText (e, uuid) {
      let text = e.target.innerHTML
      this.$vpd.commit('updateData', {
        uuid: uuid,
        key: 'text',
        value: text
      })
    },
    updataTest (e, uuid) {

    }
  }
}
</script>

<style scoped>
.lz-container {
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
  .echarts {
    width: 100%;
    height:100%;
  }
</style>
