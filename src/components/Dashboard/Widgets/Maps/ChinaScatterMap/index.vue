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
import dataControl from '../../CommonModule/mixins/dataControl'

import 'echarts/map/js/china.js'
import echarts from 'echarts'
import autoToolTip from '../../CommonModule/scripts/echartsAutoToolTip.js'

const WIDGET_NAME = 'ScatterChinaMap'
export default {
  name: WIDGET_NAME,
  group: 'map',
  icon: require('./icon/thumb-chartMap.png'),
  title: '分布散点图',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 500,
    height: 400,
    left: 50,
    top: 50,
    z: 0,
    color: '#555555',
    name: '分布散点图', // 组件名称, 可自定义
    desc: '中国地图', // 描述, 可自定义
    belong: 'page',
    animationName: '',

    chartTitle: '', // 图表标题
    titleColor: '#666666', // 标题颜色

    mapAreaColor: '#333333', // 地图区域颜色
    mapEffectScatterColor: '#f4e925', // 散点颜色
    bgMapColor: '', // 地图背景颜色
    mapBorderColor: '#000000', // 地图地域边框颜色
    mapEmphasisAreaColor: '#222222', // 高亮区域颜色
    autoToolTip: false, // 是否开启自动轮播
    autoToolTipTime: 5000, // 自动轮播时间
    autoToolTipTimer: null,

    dataAPI: 'https://mock.kunteng.org.cn/mock/5ca2cba34918866472494a14/chartMap', // API拉取地址
    dataAutoRefresh: false, // 是否自动刷新
    dataOrigin: 'local', // local 本地 api 远程接口
    dataRefreshTime: 5, // 自动刷新间隔（秒）
    dataRefresh: false, // 刷新图表, 控制面板中测试dataApi使用

    // 数据联动配置
    linkEnable: false, // 开启联动
    linkIsMain: false, // 是否是数据源
    linkMainUUID: '', // 上级的UUID, 通过此标志获取联动的数据

    keyPrimary: 'data',
    keyTarget: 'china', // 响应数据对应的字段名
    keyXAxis: '', // 从该字段取x轴数据
    keyYAxis: '', // 从该字段取y轴数据

    staticData: {
      'code': 0,
      'data': {
        'year': 2019,
        'china': [
          { 'name': '西宁', 'value': [101.78, 36.62, 219] },
          { 'name': '黑河', 'value': [127.5, 50.25, 149] },
          { 'name': '海门', 'value': [121.15, 31.89, 89] },
          { 'name': '鄂尔多斯', 'value': [109.781327, 39.608266, 12] },
          { 'name': '招远', 'value': [120.38, 37.35, 12] },
          { 'name': '舟山', 'value': [122.207216, 29.985295, 92] },
          { 'name': '齐齐哈尔', 'value': [123.97, 47.33, 14] },
          { 'name': '盐城', 'value': [120.13, 33.38, 15] },
          { 'name': '赤峰', 'value': [118.87, 42.28, 86] },
          { 'name': '青岛', 'value': [120.33, 36.07, 88] },
          { 'name': '乳山', 'value': [121.52, 36.89, 18] },
          { 'name': '金昌', 'value': [102.188043, 38.520089, 19] },
          { 'name': '泉州', 'value': [118.58, 24.93, 21] },
          { 'name': '莱西', 'value': [120.53, 36.86, 61] },
          { 'name': '日照', 'value': [119.46, 35.42, 121] },
          { 'name': '胶南', 'value': [119.97, 35.88, 22] },
          { 'name': '南通', 'value': [121.05, 32.08, 53] },
          { 'name': '拉萨', 'value': [91.11, 29.97, 24] },
          { 'name': '云浮', 'value': [112.02, 22.93, 134] },
          { 'name': '梅州', 'value': [116.1, 24.55, 25] },
          { 'name': '文登', 'value': [122.05, 37.2, 75] },
          { 'name': '上海', 'value': [121.48, 31.22, 5] }
        ]
      }
    }
  },
  mixins: [dataControl],
  props: ['w', 'h', 'val'],
  data () {
    return {
      timer: null,
      chartId: 'map' + this.val.uuid,
      dynamicData: {}
    }
  },
  computed: {
    dataSeries () {
      if (this.dynamicData[this.val.keyPrimary] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget]) {
        return this.dynamicData[this.val.keyPrimary][this.val.keyTarget]
      } else {
        return []
      }
    },
    options () {
      return {
        backgroundColor: this.val.bgMapColor, // 地图背景色
        title: {
          text: this.val.chartTitle, // 图表标题
          textStyle: {
            color: this.val.titleColor
          }
        },
        tooltip: {
          trigger: 'item',
          // formatter: '{b}：{c}'
          formatter: function (params) {
            return params.data.name + ': ' + params.data.value[2]
          }
        },
        roamController: {
          show: false,
          x: 'right',
          mapTypeControl: {
            'china': true
          }
        },
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: false,
          mapStyle: {
            styleJson: [
              {
                'featureType': 'water',
                'elementType': 'all',
                'stylers': {
                  'color': '#044161'
                }
              },
              {
                'featureType': 'land',
                'elementType': 'all',
                'stylers': {
                  'color': '#004981'
                }
              },
              {
                'featureType': 'boundary',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#064f85'
                }
              },
              {
                'featureType': 'railway',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'highway',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#004981'
                }
              },
              {
                'featureType': 'highway',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#005b96',
                  'lightness': 1
                }
              },
              {
                'featureType': 'highway',
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'arterial',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#004981'
                }
              },
              {
                'featureType': 'arterial',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#00508b'
                }
              },
              {
                'featureType': 'poi',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'green',
                'elementType': 'all',
                'stylers': {
                  'color': '#056197',
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'subway',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'manmade',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'local',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'arterial',
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'boundary',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#029fd4'
                }
              },
              {
                'featureType': 'building',
                'elementType': 'all',
                'stylers': {
                  'color': '#1a5787'
                }
              },
              {
                'featureType': 'label',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }
            ]
          }
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false // 高亮是否显示文字
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: this.val.mapAreaColor,
              borderColor: this.val.mapBorderColor // 地图地域边框颜色
            },
            emphasis: {
              areaColor: this.val.mapEmphasisAreaColor
            }
          }
        },
        series: [{
          name: '',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: this.dataSeries,
          encode: {
            value: 2
          },
          symbolSize: function (val) {
            return val[2] / 10
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false // 显示文字
            }
          },
          itemStyle: {
            normal: {
              color: this.val.mapEffectScatterColor, // 散点颜色
              shadowBlur: 10,
              shadowColor: this.val.mapEffectScatterColor
            }
          },
          zlevel: 1
        }]
      }
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

<style scoped>
  .echarts {
    width: 100%;
    height:100%;
  }
</style>
