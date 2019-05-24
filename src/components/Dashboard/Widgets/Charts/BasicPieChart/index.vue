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

    chartTitle: '销量', // 图表标题
    textStyleColor: '#666666', // 文本颜色
    showTitle: false, // 是否显示标题
    titleColor: '#fc8700', // 标题颜色
    titleFontSize: 24,
    showToolTip: true, // 是否显示提示框

    seriesRadius: ['50%', '70%'], // 圆环大小

    colorArr: ['#fc8700', '#ff00c0', '#f33a00', '#2cbdff', '#0000ff', '#25da29', '#f1f10e', '#07ecf8', '#af28d7'],

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
            'name': 'Samsung',
            'value': 33801
          },
          {
            'name': 'iPhone',
            'value': 63395
          },
          {
            'name': 'HUAWEI',
            'value': 89297
          },
          {
            'name': 'VIVO',
            'value': 76689
          },
          {
            'name': 'OPPO',
            'value': 32219
          },
          {
            'name': 'MI',
            'value': 98748
          },
          {
            'name': 'Meizu',
            'value': 18290
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
          return item[this.val.keyYAxis]
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
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: this.val.titleFontSize,
            color: this.val.titleColor,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          show: this.val.showToolTip,
          trigger: 'item', // 可选值为 axis | item
          formatter: "{a}:{b}: {c} ({d}%)"
          // axisPointer: {
          //   type: 'shadow' // 默认为直线，可选为 line | shadow
          // }
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: 'bottom',
          data: this.categories
        },
        color: this.val.colorArr,
        series: [{
          name: '销量',
          type: 'pie',
          radius: this.val.seriesRadius,
          avoidLabelOverlap: true,
          itemStyle: {
            normal: {

            }
          },
          label: {
            normal: {
              show: false
              // position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
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
