<template>
  <div
    id="viewport"
    class="holder"
    :style="preview ? screenSize : {}">
    <div
      :style="{
        backgroundColor: backgroundColor,
        backgroundImage: backPic,
        backgroundRepeat: 'no-repeat',
        width:width + 'px',
        height: height + 'px',
        position: 'relative',
        transform: 'scale(' + zoom / 100 + ')'
      }"
      class="screen"
      @dblclick="replaceImage">

      <!-- 组件 -->
      <component
        v-for="val in widgetStore"
        :is="val.type"
        :data-title="val.name"
        :class="{'g-active': id === val.uuid}"
        :key="val.uuid"
        :val="val"
        :h="height"
        :w="width"
        :data-type="val.type"
        :data-uuid="val.uuid"
        class="layer">
        <component
          v-for="child in getChilds(val.name)"
          :is="child.type"
          :data-title="child.name"
          :class="{'g-active': id === child.uuid}"
          :key="child.uuid"
          :val="child"
          :h="height"
          :w="width"
          :data-type="child.type"
          :data-uuid="child.uuid"
          class="layer layer-child" />
      </component>

      <!-- 参考线 -->
      <component v-bind:is="preview ? '' : 'reference-line'"/>

      <!-- 尺寸控制器 -->
      <component v-bind:is="preview ? '' : 'size-control'"/>
    </div>

      <!-- 右键菜单 -->
      <component v-bind:is="preview ? '' : 'context-menu'"/>
  </div>
</template>

<script>
import ReferenceLine from './ReferenceLine'
import SizeControl from './SizeControl'
import ContextMenu from './ContextMenu.vue'

import { move } from '../../mixins'
import vpd from '../../mixins/vpd'

export default {
  name: 'Viewport',
  components: {
    ReferenceLine, // 参考线
    SizeControl, // 尺寸控制
    ContextMenu // 右键菜单
  },

  mixins: [move, vpd],

  props: {
    'zoom': Number,
    'preview': Boolean
  },
  computed: {
    screenSize () {
      return {
        width: window.screen.width + 'px',
        height: window.screen.height + 'px',
        overflowX: this.width === window.screen.width ? 'hidden' : 'auto',
        overflowY: this.height === window.screen.height ? 'hidden' : 'auto'
      }
    },

    // 已添加的组件
    widgetStore () {
      return this.$vpd.state.widgets.filter(item => item.belong === 'page')
    },

    // 画布高度
    height () {
      return this.$vpd.state.page.height
    },

    // 页面宽度
    width () {
      return this.$vpd.state.page.width
    },

    // 页面背景色
    backgroundColor () {
      return this.$vpd.state.page.backgroundColor
    },

    // 页面背景图片
    backPic () {
      return this.$vpd.state.page.backPic
    },

    // 选中项id
    id () {
      return this.$vpd.state.uuid
    }
  },

  mounted () {
    // 预览窗口禁止改变组件位置
    if (this._props.preview) {
      return
    }
    // 采用事件代理的方式监听元件的选中操作
    document
      .getElementById('viewport')
      .addEventListener('mousedown', this.handleSelection, false)

    // 绑定键盘上下左右键用于元件的移动
    document
      .getElementById('viewport')
      .addEventListener(
        'keydown',
        e => {
          e.stopPropagation()
          var target = this.$vpd.state.activeElement

          // 左
          if (e.keyCode === 37 && target.left) {
            target.left -= 1
            return
          }
          // 上
          if (e.keyCode === 38 && target.top) {
            e.preventDefault()
            target.top -= 1
            return
          }
          // 右
          if (e.keyCode === 39 && target.left) {
            target.left += 1
            return
          }

          // 下
          if (e.keyCode === 40 && target.top) {
            e.preventDefault()
            target.top += 1
          }
        },
        true
      )
  },

  methods: {
    handleSelection (e) {
      var target = e.target
      // console.log(e)
      var type, uuid, curDiv
      if (target.tagName === 'CANVAS') {
        curDiv = target.parentNode.parentNode.parentNode
        type = curDiv.getAttribute('data-type')
      } else if (target.className === 'lay-cont') {
        curDiv = target.parentNode
        type = curDiv.getAttribute('data-type')
      } else {
        type = target.getAttribute('data-type')
      }
      if (type) {
        uuid = target.getAttribute('data-uuid') || curDiv.getAttribute('data-uuid')

        // console.log(e, type, uuid)
        if (type === 'braid-bg') {
          uuid = -1
        }
        // 设置选中元素
        this.$vpd.commit('select', {
          uuid: uuid || -1
        })

        // 绑定移动事件：只有从属于 page 的，除背景图以外的元件才能移动
        target = this.$vpd.state.activeElement
        if (target.belong === 'page' && target.dragable) {
          this.initmovement(e) // 参见 mixins
        }
      } else {
        // 取消选中元素
        this.$vpd.commit('select', {
          uuid: -1
        })
      }
    },

    // 替换图片
    replaceImage (e) {
      if (this.$vpd.state.activeElement.isUpload) {
        this.$vpd.$emit('upload', payload => {
          this.$vpd.commit('replaceImage', payload)
        })
      }
    },

    // 获取子组件
    getChilds (name) {
      return this.$vpd.state.widgets.filter(
        item => item.belong === name
      )
    }
  }
}
</script>

<style scoped>
.holder {
  width: 100%;
  height: 100%;
  overflow: auto;
  justify-content: center;
  font-size: 0;
  background-image: linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    ),
    linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    );
  background-position: 0 0, 13px 13px;
  background-size: 26px 26px;
  background-color: #f0f3f4;
}
.screen {
  /*margin: 25px auto;*/
  transform-origin: left top;
}
</style>
