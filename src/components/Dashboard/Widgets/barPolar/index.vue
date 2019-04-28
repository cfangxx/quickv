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
import axios from 'axios'
import stylec from './style.vue'
const WIDGET_NAME = 'braid-barpolar'
export default {
  name: WIDGET_NAME,
  group: 'chart',
  icon: require('./icon/thumb-barpolar.png'),
  title: '堆叠柱状图',
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
    width: 500,
    height: 550,
    left: 50,
    top: 50,
    z: 0,
    color: '#555555',
    text: '堆叠柱状图',
    belong: 'page',
    animationName: '',

    showX: false, // 是否显示 X 轴
    xLineWidth: 1, // X 轴轴线宽度
    xTextColor: '#666666', // X 轴文字颜色
    xTextFontSize: 14, // X 轴文字大小
    xLabelRotate: 0, // X轴文字旋转角度
    showYSplitLine: true, // 是否显示Y 轴网格线
    splitLineColor: '#dddddd', // y轴标线颜色
    colorArr: ['#fc8700', '#ff00c0', '#f33a00', '#2cbdff', '#0000ff', '#25da29', '#f1f10e', '#07ecf8', '#af28d7', '#20f807'], // 颜色数组
    polarSize: '70%', // 图表大小调整 如 70% / 300
    splitNumber: 10, // 分割段数
    polarType: 'bar', // 图表标线样式 如 line, bar

    showLegend: true, // 显示图例
    legendWidth: '60%', // 图例宽度
    legendHeight: '100', // 图例高度
    legendPositionX: 'center', // 图例位置（X 轴）
    legendPositionY: 'bottom', // 图例位置（Y 轴）
    legendFontSize: 12, // 图例文字大小
    legendTextColor: '#555', // 图例文字颜色
    legendIcon: 'roundRect', // 图例 Icon 如 circle, rect, line, roundRect, triangle, diamond, pin, none
    legendIconWidth: 20, // 图例 Icon 宽度
    legendIconHeight: 10, // 图例 Icon 高度
    legendIconGap: 10, // 图例 Icon 间距

    dataAPI: 'https://mock.kunteng.org.cn/mock/5ca2cba34918866472494a14/barchart', // API拉取地址
    dataAutoRefresh: false, // 是否自动刷新
    dataOrigin: 'local',
    dataRefreshTime: 5, // 自动刷新间隔（秒）
    dataRefresh: false, // 刷新图表, 控制面板中测试dataApi使用
    dataJSON: {
      'status': 0,
      'msg': '',
      data: [
        {
          unit: '财政事业',
          schedule: 16
        }, {
          unit: '民政事业',
          schedule: 70
        }, {
          unit: '财政事业',
          schedule: 50
        }, {
          unit: '水利事业',
          schedule: 30
        }, {
          unit: '人设事业',
          schedule: 6
        }, {
          unit: '住建事业',
          schedule: 20
        }, {
          unit: '工信事业',
          schedule: 95
        }
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
    dataLength () {
      let data = this.val.dataJSON.data.map(item => {
        return item.unit
      })
      return data
    },
    dataSeries () {
      let legendData = this.dataLength
      let seriesData = []
      let arrData = this.val.dataJSON.data
      for (let i in arrData) {
        let serItem = {}
        serItem.type = this.val.polarType
        serItem.data = []
        for (let j in arrData) {
          if (j === i) {
            let rValue = arrData[j].schedule
            serItem.data[j] = rValue
          } else {
            serItem.data[j] = 0
          }
        }
        serItem.coordinateSystem = 'polar'
        serItem.name = legendData[i]
        serItem.stack = 'a'
        seriesData[i] = serItem
      }
      return seriesData
    },
    options () {
      return {
        angleAxis: {
          type: 'category',
          z: 1,
          axisLine: {
            show: false
          }
        },
        color: this.val.colorArr,
        radiusAxis: {
          axisLine: { // 坐标 轴线
            show: this.val.showX, // 是否显示坐标轴轴线
            lineStyle: {
              color: this.val.xLineColor, // 颜色，'rgb(128, 128, 128)'，'rgba(128, 128, 128, 0.5)'，支持线性渐变，径向渐变，纹理填充
              type: 'solid', // 坐标轴线线的类型，solid，dashed，dotted
              width: this.val.xLineWidth // 坐标轴线线宽
            }
          },
          axisTick: { // 坐标轴刻度相关设置
            show: false
          },
          axisLabel: { // 坐标轴刻度标签的相关设置
            show: this.val.showXaxisTick, // 显示 X 轴刻度
            margin: 8,
            inside: false,
            rotate: this.val.xLabelRotate, // 刻度文字旋转角度
            formatter: function (value, index) { // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
              return value + ''
            },
            textStyle: {
              color: this.val.xTextColor, // X 轴文字颜色
              fontSize: this.val.xTextFontSize // X 轴文字大小
            }
          },
          max: function (value) {
            return Math.floor(value.max / 1)
          },
          splitLine: {
            show: this.val.showYSplitLine, // 是否显示分隔线
            interval: 'auto',
            lineStyle: {
              interval: 1,
              color: this.val.splitLineColor
            }
          },
          splitNumber: this.val.splitNumber,
          splitArea: {
            show: false
          }
        },
        polar: {
          center: ['50%', '50%'],
          radius: this.val.polarSize // 图表大小调整，如 70% / 200
        },
        series: this.dataSeries,
        legend: {
          show: this.val.showLegend, // 显示图例
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
          // data: ['财政', '民政', '财政', '水利', '人设', '住建', '工信']
          data: this.dataLength
        },
        tooltip: {
          trigger: 'axis'
        }
      }
    }

  },
  mounted () {

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
