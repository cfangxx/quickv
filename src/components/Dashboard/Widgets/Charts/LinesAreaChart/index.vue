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
      :options="options"
      autoresize
      class="ffff"/>
  </div>
</template>

<script>
import stylec from './style.vue'
import echarts from 'echarts/lib/echarts'
import dataControl from '../../CommonModule/mixins/dataControl'

const WIDGET_NAME = 'LinesAreaChart'
export default {
  name: WIDGET_NAME,
  group: 'chart',
  icon: require('./icon/thumb-lineschart.png'),
  title: '折线堆叠图',
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
    name: '折线堆叠图', // 组件名称, 可自定义
    desc: '', // 描述, 可自定义
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
    xName: '', // x 轴名称（单位文本）
    yName: '', // x 轴名称（单位文本）
    xRotate: 0, // x 轴文本旋转角度
    splitLineColor: '#3c4084', // y轴标线颜色
    showXaxisTick: false, // 是否显示 X 轴刻度线
    showYTick: false, // 是否显示 Y 轴刻度线
    showXLine: true, // 是否显示 X 轴轴线
    showYLine: false, // 是否显示Y 轴轴线
    showYSplitLine: true, // 是否显示Y 轴网格线
    showXSplitLine: false, // 是否显示X 轴网格线
    showX: true, // 是否显示 X 轴
    showY: true, // 是否显示 Y 轴

    lgArr: [
      [{ // 设置渐变颜色数组
        color: '#9e1aa6',
        offset: 0
      }, {
        color: '#0000ff',
        offset: 1
      }],
      [{ // 设置渐变颜色数组
        color: '#f5e410',
        offset: 0
      }, {
        color: '#1c2ed0',
        offset: 1
      }],
      [{ // 设置渐变颜色数组
        color: '#f94f2b',
        offset: 0
      }, {
        color: '#882c8f',
        offset: 1
      }]
      // [{ // 设置渐变颜色数组
      //   color: '#42b983',
      //   offset: 0
      // }, {
      //   color: '#4255ff',
      //   offset: 1
      // }]
    ],
    xyArr: ['xAxis', 'yAxis'],

    gridTop: '70', // 图表位置（距顶部）
    gridLeft: '3%', // 图表位置（距左边）
    gridRight: '8%', // 图表位置（距右边）
    gridBottom: '3%', // 图表位置（距底部）

    seriesLineWidth: [2, 2, 2], // 折线宽度
    seriesSymbol: ['none', 'none', 'none'], // 拐点图形
    seriesSymbolSize: [5, 5, 5], // 拐点大小
    isSmooth: [true, true, true], // 折线是否平滑
    showTooltip: false, // 是否显示提示框

    legend: [],

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
    keyTarget: 'dataseries', // 响应数据对应的字段名
    keyXAxis: 'categories', // 从该字段取x轴数据
    keyYAxis: 'statistics', // 从该字段取y轴数据

    dataLength: 3, // 数据共有几项
    staticData: {
      'code': 0,
      'data': {
        'year': 2019,
        'dataseries': {
          'categories': ['2011', '2012', '2013', '2014 ', '2015', '2016', '2017'],
          'statistics': [
            {
              name: '视频广告',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '直接访问',
              data: [150, 232, 201, 154, 190, 235, 210]
            },
            {
              name: '手机访问',
              data: [178, 312, 260, 254, 290, 305, 290]
            }
          ]
        }
      }
    }
  },
  mixins: [dataControl],
  props: ['w', 'h', 'val'],
  data () {
    return {
      dynamicData: {}
    }
  },
  watch: {
    'dataSeries.length' () {
      const orign = this.dynamicData[this.val.keyPrimary][this.val.keyTarget][this.val.keyYAxis]
      let datalen = orign.length
      if (datalen > this.val.lgArr.length) {
        let params = {
          property: 'lgArr',
          data: [{
            color: '#42b983',
            offset: 0
          }, {
            color: '#4255ff',
            offset: 1
          }]
        }
        this.$vpd.commit('ADD_COLOR', params)
      }
      return orign.length
    }
  },
  computed: {
    categories () {
      if (this.dynamicData[this.val.keyPrimary] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget][this.val.keyXAxis]) {
        return this.dynamicData[this.val.keyPrimary][this.val.keyTarget][this.val.keyXAxis]
      } else {
        return []
      }
    },
    dataSeries () {
      if (this.dynamicData[this.val.keyPrimary] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget][this.val.keyYAxis]) {
        const orign = this.dynamicData[this.val.keyPrimary][this.val.keyTarget][this.val.keyYAxis]
        return orign.map((item, i) => {
          return {
            type: 'line',
            name: item.name,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: this.val.seriesLineWidth[i], // 折线宽度
                  type: 'solid', // 折线样式
                  color: this.val.lgArr[i][0].color // 折线颜色
                }
              }
            },
            symbol: this.val.seriesSymbol[i], // 拐点图形 'circle' | 'rectangle' | 'triangle' | 'diamond' | 'pin'（标注）、'arrow'（箭头）
            symbolSize: this.val.seriesSymbolSize[i], // 拐点圆的大小
            smooth: this.val.isSmooth[i], // 平滑
            areaStyle: {
              show: false,
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, this.val.lgArr[i]) // 折线区域渐变色
              }
            },
            data: item.data
          }
        })
      } else {
        return []
      }
    },
    legend () {
      if (this.dynamicData[this.val.keyPrimary][this.val.keyTarget][this.val.keyYAxis]) {
        const orign = this.dynamicData[this.val.keyPrimary][this.val.keyTarget][this.val.keyYAxis]
        return orign.map(item => {
          return item.name
        })
      } else {
        return []
      }
    },
    xAxis () {
      return {
        name: this.val.xName,
        nameTextStyle: {
          color: this.val.xTextColor
        },
        type: 'category',
        nameLocation: 'end',
        show: this.val.showX, // 是否显示 X 轴
        nameGap: '12',
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
          interval: 0, // 当x轴宽度不够时，设置每隔几项显示一项
          rotate: this.val.xRotate, // x轴文本旋转角度 -90 ~ 90
          textStyle: {
            color: this.val.xTextColor // X 轴文字颜色
          }
        },
        data: this.categories // 数据
      }
    },
    yAxis () {
      return { // 纵轴标尺固定
        name: this.val.yName,
        nameTextStyle: {
          color: this.val.yTextColor
        },
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
    options () {
      return {
        title: {
          text: this.val.chartTitle, // 图表标题
          textStyle: {
            color: this.val.titleColor
          }
        },
        color: this.val.lgArr.map((item, i) => {
          return item[0].color
        }),
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
          show: false,
          data: this.legend
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
        series: this.dataSeries
      }
    }
  }
}
</script>
