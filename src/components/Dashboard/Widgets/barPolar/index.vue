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
      :style="{
        width: '800',
        height: val.height / h * h
      }"
      class="ffff"/>
  </div>
</template>

<script>
import stylec from './style.vue'
// import echarts from 'echarts/lib/echarts'
const WIDGET_NAME = 'braid-barpolar'
export default {
  name: WIDGET_NAME,
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>',
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
    text: '图表',
    belong: 'page',
    animationName: '',

    chartTitle: '销量', // 图表标题
    textStyleColor: '#666666', // 文本颜色
    itemStyleColor: '#42b983', // 柱状图颜色
    xyturn: false, // xy轴翻转
    titleColor: '#666666', // 标题颜色
    yTextColor: '#666666', // Y 轴文字颜色
    xLineColor: '#666666', // X 轴轴线颜色
    yLineColor: '#666666', // Y 轴轴线颜色
    showXaxisTick: false, // 是否显示 X 轴刻度线
    showYTick: false, // 是否显示 Y 轴刻度线
    xAxisLabel: false, // X 轴是否偏移
    showXLine: true, // 是否显示 X 轴轴线
    showYLine: false, // 是否显示Y 轴轴线
    showXSplitLine: false, // 是否显示X 轴网格线
    showY: true, // 是否显示 Y 轴

    showX: false, // 是否显示 X 轴
    xLineWidth: 1, // X 轴轴线宽度
    xTextColor: '#666666', // X 轴文字颜色
    xTextFontSize: 14, // X 轴文字大小
    xLabelRotate: 0, // X轴文字旋转角度
    showYSplitLine: true, // 是否显示Y 轴网格线
    splitLineColor: '#ddd', // y轴标线颜色
    colorArr: ['#fc8700', '#ff00c0', '#f33a00', '#2cbdff'], // 颜色数组
    polarSize: '70%', // 图表大小调整 如 70% / 300
    splitNumber: 10, // 分割段数

    showLengend: true, // 显示图例
    lengendWidth: '60%', // 图例宽度
    lengendHeight: '100', // 图例高度
    lengendPositionX: 'right', // 图例位置（X 轴）
    lengendPositionY: 'bottom', // 图例位置（Y 轴）

    dataAPI: 'http://192.168.159.2:7300/mock/5c88c1401cbd339a508e7ef4/czjx', // API拉取地址
    dataAPIAuto: false, // 是否自动刷新
    dataAPITime: 5, // 自动刷新间隔（秒）
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

    }
  },
  computed: {
    dataLength () {
      let data = this.val.dataJSON.data.map(item => {
        return item.unit
      })
      // console.log(data)
      return data
    },
    dataSeries () {
      let legendData = this.dataLength
      let seriesData = []
      let arrData = this.val.dataJSON.data
      for (let i in arrData) {
        let serItem = {}
        serItem.type = 'bar'
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
      console.log(seriesData)
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
        // color: ['#fc8700', '#ff00c0', '#f8c73c', '#c7ef7c', '#f33a00', '#acbdff', '#60ced3', '#2cbdff'],
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
        // series: [
        //   {
        //     type: 'bar',
        //     data: [1, 0, 0, 0, 0, 0, 0],
        //     coordinateSystem: 'polar',
        //     name: 'A',
        //     stack: 'a'
        //   }, {
        //     type: 'bar',
        //     data: [0, 4, 0, 0, 0, 0, 0],
        //     coordinateSystem: 'polar',
        //     name: 'B',
        //     stack: 'a'
        //   }, {
        //     type: 'bar',
        //     data: [0, 0, 3, 0, 0, 0, 0],
        //     coordinateSystem: 'polar',
        //     name: 'C',
        //     stack: 'a'
        //   }, {
        //     type: 'bar',
        //     data: [0, 0, 0, 8, 0, 0, 0],
        //     coordinateSystem: 'polar',
        //     name: 'D',
        //     stack: 'a'
        //   }, {
        //     type: 'bar',
        //     data: [0, 0, 0, 0, 4, 0, 0],
        //     coordinateSystem: 'polar',
        //     name: 'E',
        //     stack: 'a'
        //   }, {
        //     type: 'bar',
        //     data: [0, 0, 0, 0, 0, 9, 0],
        //     coordinateSystem: 'polar',
        //     name: 'F',
        //     stack: 'a'
        //   }, {
        //     type: 'bar',
        //     data: [0, 0, 0, 0, 0, 0, 1],
        //     coordinateSystem: 'polar',
        //     name: 'G',
        //     stack: 'a'
        //   }
        // ],
        legend: {
          show: this.val.showLengend, // 显示图例
          // left: '0',
          // top: '0%',
          bottom: 0,
          width: this.val.lengendWidth,
          // height: this.val.lengendHeight,
          textStyle: {
            color: '#333'
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
    changeData () {
      let data = []
      for (let i = 0, min = 5, max = 99; i < 6; i++) {
        data.push(Math.floor(Math.random() * (max + 1 - min) + min))
      }
      this.options.legend.data = data
      setTimeout(this.changeData, 2000)
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
