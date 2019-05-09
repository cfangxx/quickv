<template>
  <div
    :style="{
      display: val.display,
      position: 'absolute',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / w * 100 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      fontSize: val.fontSize,
      background: val.bgColor,
      borderStyle: 'solid',
      borderRadius: val.radius + 'px',
      borderColor: val.borderColor,
      borderWidth: val.borderWidth + 'px',
      flexDirection: val.dir,
      justifyContent: val.justify,
      alignItems: val.align
    }"
    class="table">
    <div class="lay-cont"></div>
    <div
      class="table-title table-tr"
      :style="{
        height: val.showTh ? val.thHeight + 'px' : '0px',
        textAlign: val.tbAlign
      }">
      <div
        v-show="val.showTh && val.showNum"
        class="table-th"
        :style="{
        color: val.thColor,
        fontSize: val.thFontSize + 'px',
        background: val.thBgColor,
        display: val.showTh ? 'flex' : 'none',
        flex: val.showNum ? 1 : 0
        }">{{val.thNumText}}</div>
      <div
        v-for="(item, index) in val.dataJSON.data.columns"
        :key="item.id"
        class="table-th"
        :style="{
          color: val.thColor,
          fontSize: val.thFontSize + 'px',
          background: val.thBgColor,
          display: val.showTh ? 'flex' : 'none',
          flex: val.tbPercent.split(',')[index],
          borderRight: index === val.dataJSON.data.columns.length-1 ? '' : val.tbBorderRgiht
        }"><span>{{item.name}}</span></div>
    </div>
    <!-- 表身 -->
    <div
      :style="{
        height: val.showTh ? val.height - val.thHeight + 'px' : val.height + 'px'
      }"
      class="table-body">
      <!-- 表内容块 -->
      <div
        v-for="(item, index) in val.dataJSON.data.rows.slice(0, val.dataLength)"
        :key="item.id"
        class="table-tr" >
        <div
          v-show="val.showNum"
          class="table-td table-td-num">
          <span
            :style="{
            width: val.thNumWidth + 'px',
            height: val.thNumWidth + 'px',
            color: val.thNumColor,
            fontSize: val.thNumFontSize + 'px',
            lineHeight: val.thNumWidth + 'px',
            borderRadius: val.thNumWidth / 2 + 'px',
            backgroundColor: val.thNumType === 'none' ? '' : (val.thNumBg[index] || val.thNumBg[val.thNumBg.length-1])
          }">{{index + 1}}</span>
        </div>
        <div
          v-for="(value, key, index) in item"
          :key="item[value]"
          :style="{
          color: val.tbColor,
          fontSize: val.tbFontSize + 'px',
          flex: val.tbPercent.split(',')[index],
          textAlign: val.tbAlign,
          borderRight: value === val.dataJSON.data.columns.length-1 ? '' : val.tbBorderRgiht
          }"
          class="table-td"><span>{{item[key]}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import stylec from './style.vue'
const WIDGET_NAME = 'BasicTable'

export default {
  name: WIDGET_NAME,
  group: 'table',
  icon: require('./icon/thumb-table.png'),
  title: '表格',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    hasGuide: true,
    isUpload: false,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 550,
    height: 300,
    left: 400,
    top: 400,
    z: 0,
    name: '表格', // 组件名称, 可自定义
    desc: '', // 描述, 可自定义
    belong: 'page',
    animationName: '',

    display: 'block',
    bgColor: '',
    backPic: '',
    backPicUrl: '',
    radius: 0,
    borderColor: '#000000',
    borderWidth: 0,
    dir: 'row',
    justify: 'flex-start',
    align: 'flex-start',
    fontSize: '14px',

    showTh: true, // 是否显示表头
    thHeight: 40, // 表头高度
    thFontSize: 14, // 表头文本大小
    thBgColor: '#eeeeee', // 表头背景色
    thColor: '#333333', // 表头文本颜色

    showNum: true, // 是否添加序号
    thNumText: '序号', // 序号显示文字
    thNumColor: '#ffffff', // 序号文本颜色
    thNumFontSize: 14, // 序号文本字体大小
    thNumWidth: 36, // 序号圆大小
    thNumType: 'circle', // 序号样式 none:无样式，circle: 圆形
    thNumBg: ['#42b983', '#c03639', '#2196f3'], // 序号背景色

    tbColor: '#999999', // 表格文本颜色
    tbFontSize: 14, // 表格文本字体大小
    tbAlign: 'center', // 表格对齐方式
    tbBorderRgiht: '',
    tbPercent: '1, 1, 1, 1', // 个列比例
    dataLength: 4, // 表格行数
    dataJSON: {
      'status': 0,
      'msg': '',
      'data': {
        'columns': [
          {
            'id': 'area',
            'name': '区域',
            'textAlign': 'center'
          },
          {
            'id': 'lastMonth',
            'name': '上月业绩',
            'textAlign': 'center'
          },
          {
            'id': 'thisMonth',
            'name': '本月业绩',
            'textAlign': 'center'
          },
          {
            'id': 'diff',
            'name': '增长业绩',
            'textAlign': 'center'
          }
        ],
        'rows': [
          {
            'area': '吉林',
            'lastMonth': 4922913,
            'thisMonth': 9997721,
            'diff': 5074808
          },
          {
            'area': '内蒙古',
            'lastMonth': 1222913,
            'thisMonth': 9567721,
            'diff': 3474808
          },
          {
            'area': '云南',
            'lastMonth': 3222913,
            'thisMonth': 6597721,
            'diff': 5674808
          },
          {
            'area': '广西',
            'lastMonth': 3452913,
            'thisMonth': 6787721,
            'diff': 3904808
          },
          {
            'area': '广东',
            'lastMonth': 3452913,
            'thisMonth': 6787721,
            'diff': 3904808
          },
          {
            'area': '湖南',
            'lastMonth': 3222913,
            'thisMonth': 6597721,
            'diff': 5674808
          },
          {
            'area': '乌鲁木齐',
            'lastMonth': 3222913,
            'thisMonth': 6597721,
            'diff': 5674808
          }
        ]
      }
    }
  },
  props: ['w', 'h', 'val'],
  data () {
    return {
      color: ''
    }
  }
}
</script>

<style scoped>
  .table{
    margin: 0 auto;
  }
  .table-title .table-tr{
    height:100%;
  }
  .table-tr{
    display: flex;
    flex: 1;
    flex-direction: row;
    overflow: hidden;
    border-top:0;
  }
  .table-title{
    width: 100% ;
  }
  .table-body{
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .table-th, .table-td {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex:1;
    height:100%;
    width:0;
  }
  .table-td:last-child{
    border-right:0 !important;
  }
  .table-td-num{
    flex: 1;
  }
  .table-td-num span{
    display: block;
    text-align: center;
    line-height: 36px;
    color:#ffffff;
  }
  .table-th span, .table-td span{
    width: 90%;
    display: block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
