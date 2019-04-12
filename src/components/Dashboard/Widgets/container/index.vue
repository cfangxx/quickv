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
      backgroundImage: 'url(' + val.backPic + ')',
      background: val.bgType == 'bgColor' ? val.bgColor : (val.bgType == 'bgGradientcolor' ? '-webkit-linear-gradient(' + val.bgGradientdir1 + ',' + val.bgGradientcolor1 + ',' + val.bgGradientcolor2 + ')' : val.bgType === 'bgNone' ? '' : 'url(' + val.backPic + ')') ,
      borderStyle: 'solid',
      borderRadius: val.radius + 'px',
      borderColor: val.borderColor,
      borderWidth: val.borderWidth + 'px',
      flexDirection: val.dir,
      justifyContent: val.justify,
      alignItems: val.align
    }"
    class="lz-container">
    <!-- 子组件 -->
    <slot/>
  </div>
</template>

<script>
import stylec from './style.vue'
const WIDGET_NAME = 'braid-container'

export default {
  name: WIDGET_NAME,
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layout"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
  title: '容器',
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
    display: 'flex',
    bgColor: '',
    bgType: 'bgColor',
    bgGradientcolor: 'linear-gradient(#f00,#ff0)',
    backPic: '',
    backPicUrl: '',
    radius: 0,
    borderColor: '',
    borderWidth: 0,
    text: '容器test',
    dir: 'row',
    justify: 'flex-start',
    align: 'flex-start',
    belong: 'page',
    animationName: '',
    bgGradientcolor1: '#ffffff',
    bgGradientcolor2: '#333333',
    bgGradientdir1: 'left'

  },
  props: ['w', 'h', 'val', 'playState']
}
</script>

<style scoped>
.lz-container {
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
</style>
