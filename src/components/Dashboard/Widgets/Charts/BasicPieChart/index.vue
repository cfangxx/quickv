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
const WIDGET_NAME = 'BasicPieChart'
export default {
  name: WIDGET_NAME,
  group: 'chart',
  icon: require('./icon/thumb-piechart.png'),
  title: '饼状图',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 400,
    height: 450,
    left: 400,
    top: 400,
    z: 0,
    color: '#555555',
    name: '饼状图', // 组件名称, 可自定义
    desc: '基础饼状图', // 描述, 可自定义
    belong: 'page',
    animationName: '',

    textStyleColor: '#666666', // 文本颜色

    chartTitle: '销量', // 图表标题
    showTitle: false, // 是否显示标题
    titleColor: '#fc8700', // 标题颜色
    titleFontSize: 24, // 标题字号
    titleX: 'center', // 标题水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
    titleY: 'top', // 标题垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
    titleSubText: '', // 副标题文本，'\n'指定换行
    titleSubColor: '#999999', // 副标题文本颜色
    titleSubFontSize: 12, // 副标题文本字号

    legendShow: true, // 显示图例
    legendWidth: '60%', // 图例宽度
    legendHeight: '100', // 图例高度
    legendPositionX: 'center', // 图例位置（X 轴）
    legendPositionY: 'bottom', // 图例位置（Y 轴）
    legendFontSize: 12, // 图例文字大小
    legendTextColor: '#000000', // 图例文字颜色
    legendIcon: 'roundRect', // 图例 Icon 如 circle, rect, line, roundRect, triangle, diamond, pin, none
    legendIconWidth: 20, // 图例 Icon 宽度
    legendIconHeight: 10, // 图例 Icon 高度
    legendIconGap: 10, // 图例 Icon 间距

    seriesRadius: ['40%', '60%'], // 圆环大小

    colorArr: ['#fc8700', '#ff00c0', '#f33a00', '#2cbdff', '#0000ff', '#25da29', '#f1f10e', '#07ecf8', '#af28d7'],

    showToolTip: true, // 是否显示提示框
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
    keyXAxis: 'name', // 从该字段取x轴数据
    keyYAxis: 'value', // 从该字段取y轴数据

    staticData: {
      'code': 0,
      'data': {
        'year': 2019,
        'statistics': [
          {
            'value': 33801,
            'name': 'Samsung'
          },
          {
            'value': 63395,
            'name': 'iPhone'
          },
          {
            'value': 89297,
            'name': 'HUAWEI'
          },
          {
            'value': 76689,
            'name': 'VIVO'
          },
          {
            'value': 32219,
            'name': 'OPPO'
          },
          {
            'value': 98748,
            'name': 'MI'
          },
          {
            'value': 18290,
            'name': 'Meizu'
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
      chartId: 'pie' + this.val.uuid,
      dynamicData: {}
    }
  },
  watch: {
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
          return { 'value': item[this.val.keyYAxis], 'name': item[this.val.keyXAxis] }
        })
      } else {
        return []
      }
    },
    options () {
      return {
        title: {
          show: this.val.showTitle, // 显示标题
          text: this.val.chartTitle, // 图表标题
          x: this.val.titleX,
          y: this.val.titleY,
          subtext: this.val.titleSubText,
          textStyle: { // 标题文本设置
            fontSize: this.val.titleFontSize,
            color: this.val.titleColor,
            fontWeight: 'normal'
          },
          subtextStyle: { // 副标题文本设置
            fontSize: this.val.titleSubFontSize,
            color: this.val.titleSubColor
          }
        },
        tooltip: {
          show: this.val.showToolTip,
          trigger: 'item',
          position: 'inside',
          formatter: '{a}<br/>{b}: {c} ({d}%)'
        },
        legend: {
          show: this.val.legendShow, // 显示图例
          x: this.val.legendPositionX,
          y: this.val.legendPositionY,
          width: this.val.legendWidth,
          // height: this.val.lengendHeight,
          icon: this.val.legendIcon, // 图例图标
          itemWidth: parseInt(this.val.legendIconWidth), // 图里图标宽度
          itemHeight: parseInt(this.val.legendIconHeight), // 图里图标高度
          itemGap: parseInt(this.val.legendIconGap), // 图里图标间距
          textStyle: {
            color: this.val.legendTextColor,
            fontSize: this.val.legendFontSize
          },
          data: this.categories
        },
        color: this.val.colorArr,
        series: [{
          name: '销量',
          type: 'pie',
          radius: this.val.seriesRadius,
          center: ['50%', '50%'],
          avoidLabelOverlap: true,
          hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效果
          silent: false, // 图形是否不响应和触发鼠标事件
          itemStyle: {
            normal: {
              label: {
                // textStyle: {
                //   baseline: 'middle', // 垂直对齐方式
                //   fontSize: 14,
                //   color: '#666',
                //   align: 'center' // 水平对齐方式
                // }
              }
            }
          },
          label: {
            normal: {
              show: false,
              position: 'center'
              // formatter: function (params) {
              // return params.name + ': ' + params.value
              // }
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '14',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: true
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
