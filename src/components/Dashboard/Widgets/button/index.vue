<template>
  <button
    :class="[playState ? 'anm-' + val.animationName : '']"
    :style="{
      position: 'absolute',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / w * 100 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      color: val.color,
      backgroundColor: val.bgColor,
      fontSize: val.fontSize + 'px',
      borderRadius: val.borderRadius + 'px'
    }"
    @mouseover="mouseOver($event)"
    @mouseleave="mouseLeave($event)"
    contenteditable="true"
    class="widget-btn"
    v-html="val.text"/>
</template>

<script>
import vpd from '@/components/Dashboard/Designer/mixins/vpd'
import stylec from './style.vue'
const WIDGET_NAME = 'braid-button'

export default {
  name: WIDGET_NAME,
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>',
  title: '按钮',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    name: '',
    width: 150,
    height: 40,
    left: 50,
    top: 0,
    z: 0,
    fontSize: 14,
    isHover: false,
    bgColor: '#42b983',
    bgColorHover: '#42b983',
    color: '#ffffff',
    colorHover: '#ffffff',
    borderRadius: 4,
    text: '按钮',
    belong: 'page',
    animationName: ''
  },
  mixins: [vpd],
  props: ['w', 'h', 'val', 'playState'],
  methods: {
    mouseOver (e) {
      // let param = {
      //   name: 'isHover',
      //   value: true
      // }
      // this.$vpd.commit('updataData', param)
    },
    mouseLeave (e) {
      // let param = {
      //   name: 'isHover',
      //   value: false
      // }
      // this.$vpd.commit('updateData', param)
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
  .widget-btn{
    outline: none;
    border: none;
    cursor: pointer;
  }
</style>
