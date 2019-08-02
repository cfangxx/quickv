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
import globalMap_ from '../../CommonModule/static/map'
import stylec from './style.vue'
import dataControl from '../../CommonModule/mixins/dataControl'
import hebei from '../../CommonModule/static/geometryProvince/hebei'
import echarts from 'echarts'
import autoToolTip from '../../CommonModule/scripts/echartsAutoToolTip.js'
const WIDGET_NAME = 'BraidProMap'
export default {
  name: WIDGET_NAME,
  group: 'map',
  icon: require('./icon/thumb-chartMap.png'),
  title: '省份分布图',
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
    height: 260,
    left: 100,
    top: 20,
    z: 0,
    color: '#555555',
    name: '省份分布图', // 组件名称, 可自定义
    desc: '中国地图', // 描述, 可自定义
    belong: 'page',
    animationName: '',

    chartTitle: '', // 图表标题
    titleColor: '#666666', // 标题颜色

    seriesColors: ['#1ccada', '#d2f4f8'],
    colorArr: ['#1ccada', '#d2f4f8'],
    bgMapColor: '', // 地图背景颜色
    mapBorderColor: '#ffffff', // 地图地域边框颜色
    mapEmphasisAreaColor: 'rgba(231,235,13,0.9)', // 高亮区域颜色
    showVisualMap: false, // 是否显示值域条
    visualTextColor: '#aaaaaa', // 值域条文本颜色
    autoToolTip: false, // 是否开启自动轮播
    autoToolTipTime: 5000, // 自动轮播时间

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
    keyTarget: 'mapData', // 响应数据对应的字段名
    keyXAxis: '', // 从该字段取x轴数据
    keyYAxis: '', // 从该字段取y轴数据
    keyTooltipName: 'tooltipName',
    keyTooltipUnits: 'tooltipUnits',
    keyValueName: 'valueName',

    csvHash: '',
    csvSeries: '',
    csvNum: '',
    csvHeader: '',
    csvGroup: 'map',
    staticData0: {
      code: 0,
      data: {
        year: 2019,
        china: [
          { name: '石家庄市', value: Math.round(Math.random() * 100) },
          { name: '沧州市', value: Math.round(Math.random() * 100) },
          { name: '邢台市', value: Math.round(Math.random() * 100) },
          { name: '承德市', value: Math.round(Math.random() * 100) },
          { name: '张家口市', value: Math.round(Math.random() * 100) },
          { name: '保定市', value: Math.round(Math.random() * 100) },
          { name: '衡水市', value: Math.round(Math.random() * 100) },
          { name: '唐山市', value: Math.round(Math.random() * 100) }
        ]
      }
    },
    staticData: {
      'code': 0,
      'data': {
        'mapData': [
          { name: '石家庄市', value: Math.round(Math.random() * 100), tooltipValue: [46, 15, 29], url: 'xxx.com' },
          { name: '沧州市', value: Math.round(Math.random() * 100), tooltipValue: [46, 15, 29], url: 'xxx.com' },
          { name: '邢台市', value: Math.round(Math.random() * 100), tooltipValue: [46, 15, 29], url: 'xxx.com' },
          { name: '承德市', value: Math.round(Math.random() * 100), tooltipValue: [46, 15, 29], url: 'xxx.com' },
          { name: '张家口市', value: Math.round(Math.random() * 100), tooltipValue: [46, 15, 29], url: 'xxx.com' },
          { name: '保定市', value: Math.round(Math.random() * 100), tooltipValue: [46, 15, 29], url: 'xxx.com' },
          { name: '衡水市', value: Math.round(Math.random() * 100), tooltipValue: [46, 15, 29], url: 'xxx.com' },
          { name: '唐山市', value: Math.round(Math.random() * 100), tooltipValue: [46, 15, 29], url: 'xxx.com' }
        ],
        tooltipName: ['提示1项', '提示2项', '提示3项'],
        tooltipUnits: ['提示1单位', '提示2单位', '提示3单位'],
        valueName: '人口(万)'
      }
    }
  },
  mixins: [dataControl],
  props: ['w', 'h', 'val'],
  data () {
    return {
      timer: null,
      chartId: 'char' + this.val.uuid,
      dynamicData: {}
    }
  },
  computed: {
    dataSeries () {
      if (this.dynamicData[this.val.keyPrimary] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget]) {
        // let data = this.dynamicData[this.val.keyPrimary][this.val.keyTarget].map(item => {
        //   return {
        //     name: item.name,
        //     value: item.value
        //   }
        // })
        let data = this.dynamicData[this.val.keyPrimary][this.val.keyTarget]
        console.log(data)
        this.registerMap()
        return data
      } else {
        return []
      }
    },
    tooltipName () {
      if (this.dynamicData[this.val.keyPrimary] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget]) {
        return this.dynamicData[this.val.keyPrimary][this.val.keyTooltipName]
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
            if (params.data.tooltipValue && params.data.tooltipValue.length > 0) {
              // let tooltipval = params.data.tooltipValue
              console.log(this)
              // let tooltipname = this.tooltipName
              let str = `${params.name}</br>`
              // for (let i in tooltipval) {
              //   str += `${tooltipname[i]}：${tooltipval[i]}`
              // }
              return str
            } else {
              return `${params.name}：${params.value}`
            }
          }
        },
        legend: {
          orient: 'vertical',
          top: '9%',
          left: '5%',
          icon: 'circle',
          data: [],
          selectedMode: 'single',
          selected: {},
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 30,
          inactiveColor: '#b6d7ff',
          textStyle: {
            color: '#ec808d',
            fontSize: 14,
            fontWeight: 300,
            padding: [0, 0, 0, 15]
          }
        },
        roamController: {
          show: true,
          x: 'right',
          mapTypeControl: {
            'china': true
          }
        },
        visualMap: {
          show: this.val.showVisualMap, // 显示值域条
          type: 'continuous', // 连续型
          min: 0,
          max: 100, // 值域最大值，必须参数
          left: 'left',
          top: 'bottom',
          color: this.val.seriesColors,
          textStyle: {
            color: this.val.visualTextColor // 值域条文本颜色
          },
          calculable: false // 是否启用值域漫游
        },
        series: [{
          name: '',
          type: 'map',
          map: 'hebei',
          roam: false,
          itemStyle: {
            normal: { // 普通状态下样式
              areaColor: this.val.seriesColors[1],
              borderColor: this.val.mapBorderColor, // 地图地域边框颜色
              textStyle: {
                color: 'red'
              }
            },
            emphasis: { // 高亮状态下样式
              areaColor: this.val.mapEmphasisAreaColor
            }
          },
          data: this.dataSeries
        }
        ]
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
    this.registerMap()
    if (this.val.autoToolTip) {
      this.drawBar(this.val.autoToolTipTime)
    }
    if (this.$vpd.state.uuid === this.val.uuid) {
      let colors = this.$vpd.state.page.colors.value.slice(0, 2)
      let param = {
        name: 'seriesColors',
        value: colors
      }
      this.$vpd.commit('UPDATE_ACTIVE_ELEMENT', param)
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
    },
    convertData (data) {
      let res = []
      for (let i = 0; i < data.length; i++) {
        let geoCoord = globalMap_.geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    },
    registerMap () {
      echarts.registerMap('hebei', hebei)
    }
  }
}
</script>
