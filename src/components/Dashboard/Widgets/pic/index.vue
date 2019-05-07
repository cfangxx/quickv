<template>
  <div class="lz-image"
    :class="[playState ? 'anm-' + val.animationName : '']"
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.belong === 'page' ? val.left / w * 100 + '%' : '0',
      top: val.belong === 'page' ? val.top / h * 100 + '%' : '0',
      zIndex: val.z
    }">
    <img
      :src="val.url">
  </div>
</template>

<script>
const WIDGET_NAME = 'braid-pic'

export default {
  name: WIDGET_NAME,
  group: 'material',
  icon: require('./icon/thumb-pic.png'),
  title: '图片',
  panel: null,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: true,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    left: 0,
    z: 0,
    href: '', // 超链接
    name: '图片', // 组件名称, 可自定义
    desc: '', // 描述, 可自定义
    belong: 'page', // 属于哪个容器
    animationName: ''
  },
  props: [
    'val', // 图片对象
    'w', // 包含块的宽
    'h', // 包含块的高
    'playState' // 动画播放状态
  ]
}
</script>

<style scoped>
  .lz-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    user-select: none;
    -webkit-user-drag: none;
    pointer-events: none;
  }
</style>
