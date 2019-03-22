<template>
  <div
    :class="[playState ? 'anm-' + val.animationName : '']"
    :style="{
      display: val.display,
      position: 'absolute',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / w * 100 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      background: val.bgType == 'bgColor' ? val.bgColor : (val.bgType == 'bgGradientcolor' ? '-webkit-linear-gradient(' + val.bgGradientdir1 + ',' + val.bgGradientcolor1 + ',' + val.bgGradientcolor2 + ')' : '') ,
      backgroundImage: 'url(' + val.backPic + ')',
      borderStyle: 'solid',
      borderRadius: val.radius + 'px',
      borderColor: val.borderColor,
      borderWidth: val.borderWidth + 'px',
      flexDirection: val.dir,
      justifyContent: val.justify,
      alignItems: val.align
    }"
    class="table">
    <div class="table-title">
      <div class="table-tr">
        <div class="table-th"><span>标题1</span></div>
        <div class="table-th"><span>标题1</span></div>
        <div class="table-th"><span>标题1</span></div>
        <div class="table-th"><span>标题1</span></div>
        <div class="table-th"><span>标题1</span></div>
        <div class="table-th"><span>标题1</span></div>
        <div class="table-th"><span>标题1</span></div>
        <div class="table-th"><span>标题1</span></div>
        <div class="table-th"><span>标题1</span></div>
        <div class="table-th"><span>标题1</span></div>
      </div>
    </div>
    <!-- 表身 -->
    <div class="table-body">
      <!-- 表内容块 -->
      <div class="table-tr">
        <div class="table-td"><span>内容1</span></div>
        <div class="table-td"><span>内容1</span></div>
        <div class="table-td"><span>内容1</span></div>
        <div class="table-td"><span>内容1</span></div>
        <div class="table-td"><span>内容1</span></div>
        <div class="table-td"><span>内容1</span></div>
        <div class="table-td"><span>内容1</span></div>
        <div class="table-td"><span>内容1</span></div>
        <div class="table-td"><span>内容1</span></div>
        <div class="table-th"><span>内容1</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import stylec from './style.vue'
const WIDGET_NAME = 'braid-table'

export default {
  name: WIDGET_NAME,
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layout"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
  title: '表格',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: true,
    hasGuide: true,
    isUpload: false,
    isChild: false,
    dragable: true,
    resizable: true,
    name: '',
    width: 650,
    height: 300,
    left: 50,
    top: 0,
    z: 0,
    display: 'block',
    bgColor: '',
    bgType: 'bgColor',
    bgGradientcolor: 'linear-gradient(#f00,#ff0)',
    backPic: '',
    backPicUrl: '',
    radius: 0,
    borderColor: '',
    borderWidth: 0,
    text: '表格',
    dir: 'row',
    justify: 'flex-start',
    align: 'flex-start',
    belong: 'page',
    animationName: '',
    bgGradientcolor1: '#ffffff',
    bgGradientcolor2: '#333333',
    bgGradientdir1: 'left',

    tableData: {
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
          }
        ]
      }
    }

  },
  props: ['w', 'h', 'val', 'playState']
}
</script>

<style scoped>
  .table{
    width: 80%;
    margin: 0.5rem auto 0;
  }
  .table-tr{
    overflow: hidden;
    height:40px;
    border: 1px solid #bfbfbf;
    border-top:0;
  }
  .table-title{
    width: 100% ;
    height:50px;
    border-top: 1px solid #bfbfbf;
  }
  .table-body{
    width: 100%;
  }

  .table-th, .table-td {
    float: left;
    width: 10%;
    border-right: 1px solid #bfbfbf;
  }
  .table-th span, .table-td span{
    display: block;
    padding: 0 0.05rem;
  }
</style>
