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
import 'echarts/map/js/china.js'
import vpd from '@/components/Dashboard/Designer/mixins/vpd'
import dataControl from '@/components/Dashboard/Widgets/common/mixins/dataControl'

const WIDGET_NAME = 'braid-china-map'
export default {
  name: WIDGET_NAME,
  group: 'map',
  icon: require('./icon/thumb-chartMap.png'),
  title: '中国地图',
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
    name: '地图', // 组件名称, 可自定义
    desc: '中国地图', // 描述, 可自定义
    belong: 'page',
    animationName: '',

    chartTitle: '', // 图表标题
    titleColor: '#666666', // 标题颜色

    lgArr: [{ // 设置渐变颜色数组
      color: '#ba3ba3',
      offset: 0
    }],

    gridTop: '70', // 图表位置（距顶部）
    gridLeft: '3%', // 图表位置（距左边）
    gridRight: '3%', // 图表位置（距右边）
    gridBottom: '3%', // 图表位置（距底部）

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
    keyTarget: 'china', // 响应数据对应的字段名
    keyXAxis: '', // 从该字段取x轴数据
    keyYAxis: '', // 从该字段取y轴数据

    staticData: {
      'code': 0,
      'data': {
        'year': 2019,
        'china': [
          { name: '北京', value: Math.round(Math.random() * 100) },
          { name: '天津', value: Math.round(Math.random() * 100) },
          { name: '上海', value: Math.round(Math.random() * 100) },
          { name: '重庆', value: Math.round(Math.random() * 100) },
          { name: '河北', value: Math.round(Math.random() * 100) },
          { name: '河南', value: Math.round(Math.random() * 100) },
          { name: '云南', value: Math.round(Math.random() * 100) },
          { name: '辽宁', value: Math.round(Math.random() * 100) },
          { name: '黑龙江', value: Math.round(Math.random() * 100) },
          { name: '湖南', value: Math.round(Math.random() * 100) },
          { name: '安徽', value: Math.round(Math.random() * 100) },
          { name: '山东', value: Math.round(Math.random() * 100) },
          { name: '新疆', value: Math.round(Math.random() * 100) },
          { name: '江苏', value: Math.round(Math.random() * 100) },
          { name: '浙江', value: Math.round(Math.random() * 100) },
          { name: '江西', value: Math.round(Math.random() * 100) },
          { name: '湖北', value: Math.round(Math.random() * 100) },
          { name: '广西', value: Math.round(Math.random() * 100) },
          { name: '甘肃', value: Math.round(Math.random() * 100) },
          { name: '山西', value: Math.round(Math.random() * 100) },
          { name: '内蒙古', value: Math.round(Math.random() * 100) },
          { name: '陕西', value: Math.round(Math.random() * 100) },
          { name: '吉林', value: Math.round(Math.random() * 100) },
          { name: '福建', value: Math.round(Math.random() * 100) },
          { name: '贵州', value: Math.round(Math.random() * 100) },
          { name: '广东', value: Math.round(Math.random() * 100) },
          { name: '青海', value: Math.round(Math.random() * 100) },
          { name: '西藏', value: Math.round(Math.random() * 100) },
          { name: '四川', value: Math.round(Math.random() * 100) },
          { name: '宁夏', value: Math.round(Math.random() * 100) },
          { name: '海南', value: Math.round(Math.random() * 100) },
          { name: '台湾', value: Math.round(Math.random() * 100) },
          { name: '香港', value: Math.round(Math.random() * 100) },
          { name: '澳门', value: Math.round(Math.random() * 100) }
        ]
      }
    }
  },
  mixins: [vpd, dataControl],
  props: ['w', 'h', 'val'],
  data () {
    return {
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
        roamController: {
          show: true,
          x: 'right',
          mapTypeControl: {
            'china': true
          }
        },
        visualMap: {
          show: true,
          type: 'continuous', // 连续型
          min: 0,
          max: 100, // 值域最大值，必须参数
          left: 'left',
          top: 'bottom',
          color: ['#1ccada', '#d2f4f8'],
          calculable: true // 是否启用值域漫游
        },
        series: [{
          name: '销量',
          type: 'map',
          mapType: 'china',
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#d2f4f8',
              borderColor: 'rgba(255,255,255,0.9)'
            },
            emphasis: {
              areaColor: '#0000ff'
            }
          },
          data: this.dataSeries
        }]
      }
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
