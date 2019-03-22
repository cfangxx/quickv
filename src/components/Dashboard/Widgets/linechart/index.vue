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
      backgroundImage: 'url(' + val.backPic + ')',
      color: val.color
    }"
    contenteditable="true">
    <v-echart
      :options="options"
      :style="{
        width: '800',
        height: val.height / h * h
      }"
      class="ffff"/>
  </div>
</template>

<script>
import stylec from './style.vue'
import echarts from 'echarts/lib/echarts'
const WIDGET_NAME = 'braid-linechart'
export default {
  name: WIDGET_NAME,
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>',
  title: '柱状图',
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
    width: 700,
    height: 350,
    left: 50,
    top: 50,
    z: 0,
    color: '#555555',
    text: '图表',
    belong: 'page',
    animationName: '',

    chartTitle: '销量', // 图表标题
    textStyleColor: '#666666', // 文本颜色
    itemStyleColor: '#42b983', // 柱状图颜色
    xyturn: false, // xy轴翻转
    titleColor: '#666666', // 标题颜色
    xTextColor: '#666666', // X 轴文字颜色
    yTextColor: '#666666', // Y 轴文字颜色
    xLineColor: '#666666', // X 轴线条颜色
    yLineColor: '#666666', // Y 轴线条颜色
    splitLineColor: '#3c4084', // y轴标线颜色
    showXaxisTick: false, // 是否显示 X 轴刻度线
    showYTick: false, // 是否显示 Y 轴刻度线
    xAxisLabel: false, // X 轴是否偏移
    showXLine: true, // 是否显示 X 轴轴线
    showYLine: false, // 是否显示Y 轴轴线
    showYSplitLine: true, // 是否显示Y 轴网格线
    showXSplitLine: false, // 是否显示X 轴网格线
    showX: true, // 是否显示 X 轴
    showY: true, // 是否显示 Y 轴

    seriseBarWidth: '40%', // 柱形图宽度
    seriseRadius1: 0, // 柱形图圆角
    seriseRadius2: 0, // 柱形图圆角
    seriseRadius3: 0, // 柱形图圆角
    seriseRadius4: 0, // 柱形图圆角
    lgArr: [{ // 设置渐变颜色数组
      color: '#ba3ba3',
      offset: 0
    }],
    xyArr: ['xAxis', 'yAxis'],

    gridTop: '70', // 图表位置（距顶部）
    gridLeft: '3%', // 图表位置（距左边）
    gridRight: '3%', // 图表位置（距右边）
    gridBottom: '3%', // 图表位置（距底部）

    dataAPI: 'http://192.168.159.2:7300/mock/5c88c1401cbd339a508e7ef4/czjx', // API拉取地址
    dataAPIAuto: false, // 是否自动刷新
    dataAPITime: 5, // 自动刷新间隔（秒）
    dataJSON: {
      'status': 0,
      'msg': '',
      'data': {
        'categories': [
          '三星',
          'vivo',
          'oppo',
          '华为',
          '小g米',
          'iPhone'
        ],
        'series': [
          460751,
          814276,
          583693,
          1076385,
          1186058,
          1369500
        ]
      }
    }
  },
  props: ['w', 'h', 'val', 'playState'],
  data () {
    return {

    }
  },
  computed: {
    barChartData () {
      return [
        {
          nameLocation: 'start',
          show: this.val.showX, // 是否显示 X 轴
          nameGap: '50',
          boundaryGap: true,
          axisTick: {
            show: this.val.showXaxisTick, // 是否显示 X 轴刻度线
            alignWithLabel: this.val.xAxisLabel // X 轴偏移
          },
          axisLine: {
            show: this.val.showXLine, // 是否显示 X 轴轴线
            lineStyle: {
              color: this.val.xLineColor // X 轴线条颜色
            }
          },
          splitLine: {
            show: this.val.showXSplitLine // X 轴网格线
          },
          axisLabel: {
            textStyle: {
              color: this.val.xTextColor // X 轴文字颜色
            }
          },
          data: this.val.dataJSON.data.categories // 数据
        }, { // 纵轴标尺固定
          show: this.val.showY, // 是否显示 Y 轴
          type: 'value',
          scale: true,
          inverse: false,
          // max: Math.max.apply(null, this.val.dataJSON.data.series),
          min: 0,
          axisLine: {
            show: this.val.showYLine, // 是否显示 Y 轴轴线
            lineStyle: {
              color: this.val.yLineColor // Y 轴线条颜色
            }
          },
          axisLabel: {
            textStyle: {
              color: this.val.yTextColor // Y 轴文字颜色
            }
          },
          axisTick: {
            show: this.val.showYTick, // 是否显示 Y 轴刻度线
            alignWithLabel: this.val.yAxisLabel // Y 轴偏移
          },
          splitLine: {
            show: this.val.showYSplitLine, // 是否显示 Y 轴网格线
            lineStyle: {
              type: 'solid',
              color: this.val.splitLineColor // y轴标线颜色
            }
          },
          boundaryGap: [0.2, 0.2]
        }
      ]
    },
    options () {
      return {
        title: {
          text: this.val.chartTitle, // 图表标题
          textStyle: {
            color: this.val.titleColor
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          data: '销量'
        },
        grid: {
          top: this.val.gridTop, // 上边距
          left: this.val.gridLeft, // 图表位置 左边距
          right: this.val.gridRight, // 右边距
          bottom: this.val.gridBottom, // 下边距
          containLabel: true
        },
        xAxis: this.val.xyturn ? this.barChartData[1] : this.barChartData[0],
        yAxis: this.val.xyturn ? this.barChartData[0] : this.barChartData[1],
        series: [{
          name: '销量',
          type: 'bar',
          barWidth: this.val.seriseBarWidth, // 柱形图宽度
          itemStyle: {
            normal: {
              barBorderRadius: [this.val.seriseRadius1, this.val.seriseRadius2, this.val.seriseRadius3, this.val.seriseRadius4], // 柱形图圆角
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, this.val.lgArr) // 柱体颜色/渐变色
            }
          },
          data: this.val.dataJSON.data.series
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
