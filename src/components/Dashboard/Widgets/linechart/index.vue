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
      autoresize
      class="ffff"/>
  </div>
</template>

<script>
import stylec from './style.vue'
import echarts from 'echarts/lib/echarts'
import axios from 'axios'
const WIDGET_NAME = 'braid-linechart'
export default {
  name: WIDGET_NAME,
  group: 'chart',
  icon: require('./icon/thumb-linechart.png'),
  title: '折线区域图',
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
    text: '折线区域图',
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
    showXLine: true, // 是否显示 X 轴轴线
    showYLine: false, // 是否显示Y 轴轴线
    showYSplitLine: true, // 是否显示Y 轴网格线
    showXSplitLine: false, // 是否显示X 轴网格线
    showX: true, // 是否显示 X 轴
    showY: true, // 是否显示 Y 轴

    lgArr: [{ // 设置渐变颜色数组
      color: '#9e1aa6',
      offset: 0
    }, {
      color: '#0000ff',
      offset: 1
    }],
    xyArr: ['xAxis', 'yAxis'],

    gridTop: '70', // 图表位置（距顶部）
    gridLeft: '3%', // 图表位置（距左边）
    gridRight: '3%', // 图表位置（距右边）
    gridBottom: '3%', // 图表位置（距底部）

    seriesLineWidth: 0, // 折线宽度
    seriesSymbol: 'none', // 拐点图形
    seriesSymbolSize: 5, // 拐点大小
    isSmooth: true, // 折线是否平滑
    showTooltip: false, // 是否显示提示框

    dataAPI: 'https://mock.kunteng.org.cn/mock/5ca2cba34918866472494a14/barchart', // API拉取地址
    dataAutoRefresh: false, // 是否自动刷新
    dataOrigin: 'local',
    dataRefreshTime: 5, // 自动刷新间隔（秒）
    dataRefresh: false, // 刷新图表, 控制面板中测试dataApi使用
    dataJSON: {
      'categories': [
        '三星',
        'vivo',
        'oppo',
        '华为',
        '小g米',
        'iPhone'
      ],
      'series': [
        46,
        81,
        58,
        107,
        118,
        136
      ]
    }
  },
  props: ['w', 'h', 'val', 'playState'],
  data () {
    return {
      timer: null,
      dataJSON: {
        'categories': [],
        'series': []
      }
    }
  },
  computed: {
    xAxis () {
      return {
        type: 'category',
        nameLocation: 'start',
        show: this.val.showX, // 是否显示 X 轴
        nameGap: '50',
        boundaryGap: false,
        axisTick: {
          show: this.val.showXaxisTick // 是否显示 X 轴刻度线
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
        data: this.val.dataJSON.categories // 数据
      }
    },
    yAxis () {
      return { // 纵轴标尺固定
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
    },
    chartData () {
      if (this.val.dataOrigin === 'local') {
        return this.val.dataJSON
      } else {
        return this.dataJSON
      }
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
          show: this.val.showTooltip, // 是否显示提示框
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
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
        xAxis: this.val.axisReverse ? this.yAxis : this.xAxis,
        yAxis: this.val.axisReverse ? this.xAxis : this.yAxis,
        series: [{
          name: '销量',
          type: 'line',
          symbol: this.val.seriesSymbol, // 拐点图形 'circle' | 'rectangle' | 'triangle' | 'diamond' | 'pin'（标注）、'arrow'（箭头）
          symbolSize: this.val.seriesSymbolSize, // 拐点圆的大小
          smooth: this.val.isSmooth, // 平滑
          itemStyle: {
            normal: {
              lineStyle: {
                width: this.val.seriesLineWidth, // 折线宽度
                type: 'solid', // 折线样式
                color: this.val.lgArr[0].color // 折线颜色
              }
            }
          },
          areaStyle: {
            show: false,
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, this.val.lgArr) // 折线区域渐变色
            }
          },
          // data: this.val.dataJSON.data.series
          data: this.chartData.series
        }]
      }
    }

  },
  mounted () {
    this.setOptionData()
  },
  beforeDestroy () {
    this.clearTimer()
  },
  watch: {
    'val.dataOrigin': function (origin, old) {
      if (origin === 'api') {
        this.setOptionData()
      }
    },
    'val.dataAutoRefresh': function (opt, old) {
      if (opt) {
        this.setOptionData()
      }
    },
    'val.dataRefresh': function (opt, old) {
      this.setOptionData()
    }
  },
  methods: {
    setOptionData () { // API 拉取数据
      if (this.val.dataOrigin !== 'api') {
        return
      }

      axios({
        type: 'get',
        headers: { 'Content-Type': 'application/json' },
        url: this.val.dataAPI
      }).then(response => {
        const res = response.data
        if (res.code === 0) {
          this.dataJSON = res.data
        }
      })

      this.clearTimer()
      if (this.val.dataAutoRefresh) {
        let _this = this
        this.timer = setTimeout(() => { _this.setOptionData() }, _this.val.dataRefreshTime * 1000)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
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
