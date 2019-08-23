import echarts from 'echarts/lib/echarts'
import autoToolTip from '../../CommonModule/scripts/echartsAutoToolTip.js'
export default {
  data () {
    return {
      timer: null,
      chartId: 'echart' + this.val.uuid
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
