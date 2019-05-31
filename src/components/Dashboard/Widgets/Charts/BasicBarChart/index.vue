<template>
  <div
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
      :id="chartId"
      :options="options"
      autoresize
      class="ffff"/>
  </div>
</template>

<script>
import stylec from './style.vue'
import echarts from 'echarts/lib/echarts'
import dataControl from '../../CommonModule/mixins/dataControl'
import autoToolTip from '../../CommonModule/scripts/echartsAutoToolTip.js'
const WIDGET_NAME = 'BasicBarChart'
export default {
  name: WIDGET_NAME,
  group: 'chart',
  icon: require('./icon/thumb-barchart.png'),
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
    width: 700,
    height: 350,
    left: 400,
    top: 400,
    z: 0,
    color: '#555555',
    name: '柱状图', // 组件名称, 可自定义
    desc: '基础柱状图', // 描述, 可自定义
    belong: 'page',
    animationName: '',

    chartTitle: '销量', // 图表标题
    textStyleColor: '#666666', // 文本颜色
    itemStyleColor: '#42b983', // 柱状图颜色
    axisReverse: false, // xy轴翻转
    titleColor: '#666666', // 标题颜色
    xTextColor: '#666666', // X 轴文字颜色
    yTextColor: '#666666', // Y 轴文字颜色
    xLineColor: '#666666', // X 轴线条颜色
    xName: '', // X 轴名称 (x 轴单位文本)
    yName: '', // Y 轴名称 (y 轴单位文本)
    xRotate: 0, // X 轴文本旋转角度
    yLineColor: '#666666', // Y 轴线条颜色
    yInverse: false, // Y 轴翻转
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
    showTitle: false, // 是否显示标题
    showToolTip: true, // 是否显示提示框

    seriseBarWidth: '40%', // 柱形图宽度
    seriseRadius1: 20, // 柱形图圆角
    seriseRadius2: 20, // 柱形图圆角
    seriseRadius3: 0, // 柱形图圆角
    seriseRadius4: 0, // 柱形图圆角
    seriseRadiuses: [0, 0, 0, 0],
    lgArr: [{ // 设置渐变颜色数组
      color: '#ba3ba3',
      offset: 0
    }],

    gridTop: '70', // 图表位置（距顶部）
    gridLeft: '3%', // 图表位置（距左边）
    gridRight: '8%', // 图表位置（距右边）
    gridBottom: '3%', // 图表位置（距底部）

    autoToolTip: false, // 是否开启自动轮播
    autoToolTipTime: 5000, // 自动轮播时间

    dataAPI: 'https://easy-mock.com/mock/5cc6c0a89edd7844f38df463/cryia/api/salevolume', // API拉取地址
    dataAutoRefresh: false, // 是否自动刷新
    dataOrigin: 'local', // local 本地 api 远程接口
    dataRefreshTime: 5, // 自动刷新间隔（秒）
    dataRefresh: false, // 刷新图表, 控制面板中测试dataApi使用

    // 数据联动配置
    linkEnable: false, // 开启联动
    linkIsMain: false, // 是否是数据源
    linkMainUUID: '', // 上级的UUID, 通过此标志获取联动的数据

    keyPrimary: 'data',
    keyTarget: 'statistics', // 响应数据对应的字段名
    keyXAxis: 'vendor', // 从该字段取x轴数据
    keyYAxis: 'sales', // 从该字段取y轴数据

    staticData: {
      'code': 0,
      'data': {
        'year': 2019,
        'statistics': [
          {
            'vendor': 'Samsung',
            'sales': 33801
          },
          {
            'vendor': 'iPhone',
            'sales': 63395
          },
          {
            'vendor': 'HUAWEI',
            'sales': 89297
          },
          {
            'vendor': 'VIVO',
            'sales': 76689
          },
          {
            'vendor': 'OPPO',
            'sales': 32219
          },
          {
            'vendor': 'MI',
            'sales': 98748
          },
          {
            'vendor': 'Meizu',
            'sales': 18290
          }
        ]
      }
    }
  },
  mixins: [dataControl],
  props: ['w', 'h', 'val'],
  data () {
    return {
      timer: null,
      chartId: 'bar' + this.val.uuid,
      dynamicData: {}
    }
  },
  watch: {
    'val.seriseRadiuses': function (val) {
      console.log(val, typeof this.val.seriseRadiuses)
    },
    'val.autoToolTip': function (val) {
      this.drawBar(val ? this.val.autoToolTipTime : 0)
    },
    'val.autoToolTipTime': function (val) {
      this.drawBar(val)
    }
  },
  computed: {
    categories () {
      if (this.dynamicData[this.val.keyPrimary] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget]) {
        return this.dynamicData[this.val.keyPrimary][this.val.keyTarget].map(item => {
          return item[this.val.keyXAxis]
        })
      } else {
        return []
      }
    },
    dataSeries () {
      if (this.dynamicData[this.val.keyPrimary] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget]) {
        return this.dynamicData[this.val.keyPrimary][this.val.keyTarget].map(item => {
          return item[this.val.keyYAxis]
        })
      } else {
        return []
      }
    },
    xAxis () {
      return {
        name: this.val.xName, // x 轴单位x
        nameTextStyle: {
          color: this.val.xTextColor
        },
        // nameLocation: 'end',
        show: this.val.showX, // 是否显示 X 轴
        nameGap: '6', // x 轴单位位置
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
          interval: 0, // 当x轴宽度不够时，设置每隔几项显示一项
          rotate: this.val.xRotate, // x轴文本旋转角度
          textStyle: {
            color: this.val.xTextColor // X 轴文字颜色
          }
        },
        position: this.val.yInverse ? 'top' : '',
        data: this.categories // 数据
      }
    },
    yAxis () {
      return { // 纵轴标尺固定
        show: this.val.showY, // 是否显示 Y 轴
        type: 'value',
        name: this.val.yName,
        nameTextStyle: {
          color: this.val.yTextColor
        },
        scale: true,
        inverse: this.val.yInverse, // y 轴翻转
        // max: Math.max.apply(null, this.val.dataJSON.series),
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
    options () {
      return {
        title: {
          show: this.val.showTitle, // 显示标题
          text: this.val.chartTitle, // 图表标题
          textStyle: {
            color: this.val.titleColor
          }
        },
        tooltip: {
          show: this.val.showToolTip,
          trigger: 'axis', // 可选值为 axis | item
          axisPointer: {
            type: 'shadow' // 默认为直线，可选为 line | shadow
          }
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
          type: 'bar',
          barWidth: this.val.seriseBarWidth, // 柱形图宽度
          itemStyle: {
            normal: {
              barBorderRadius: [this.val.seriseRadiuses[0] || this.val.seriseRadiuses[0] + 1, this.val.seriseRadiuses[1] || this.val.seriseRadiuses[1] + 1, this.val.seriseRadiuses[2] || this.val.seriseRadiuses[2] + 1, this.val.seriseRadiuses[3] || this.val.seriseRadiuses[3] + 1], // 柱形图圆角
              // barBorderRadius: this.val.seriseRadiuses || [0, 0, 0, 0], // 柱形图圆角
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, this.val.lgArr) // 柱体颜色/渐变色
            }
          },
          data: this.dataSeries
        }]
      }
    }
  },
  mounted () {
    if (this.val.autoToolTip) {
      this.drawBar(this.val.autoToolTipTime)
    }
  },
  methods: {
    drawBar (time) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(this.chartId))
      // 使用刚指定的配置项和数据显示图表
      myChart.setOption(this.options)
      // 使用轮播插件
      clearInterval(this.timer)
      this.timer = autoToolTip.autoHover(myChart, this.options, this.dataSeries.length, time)
    }
  }
}
</script>
