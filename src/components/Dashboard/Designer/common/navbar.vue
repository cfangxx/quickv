<template>
  <header class="header">
    <div class="navbar container grid-xl">
      <section class="logo navbar-cont">
        <a>logo</a>
      </section>
      <section class="navbar-cont nav-middle">
        <a
          class="icon addWidget">添加组件</a>
        <div class="index-show ">
          <div
            id="box"
            class="tip_Wrapinner navbar-widget-cont">
            <toolbar
              :zoom="zoom"
              class="toolbar column"/>
          </div>
        </div>
      </section>
      <section class="navbar-cont navbar-right">
        <a
          class="btn btn-link tooltip tooltip-bottom"
          data-tooltip="复制元件 Ctrl + C"
          @click="copyWidget">
          <vpd-icon name="copy" /> 复制
        </a>
        <a
          class="btn btn-link tooltip tooltip-bottom"
          data-tooltip="删除元件 Delete"
          @click="dele">
          <vpd-icon name="trash-2" /> 删除
        </a>
        <a
          class="btn btn-link tooltip tooltip-bottom"
          data-tooltip="保存 Ctrl + S"
          @click="save"><vpd-icon name="save" /> 保存</a>
      </section>
    </div>
  </header>
</template>

<script>
import vpd from '../mixins/vpd'
import toolbar from './toolbartest.vue'
export default {
  components: {
    toolbar
  },
  mixins: [vpd],
  data () {
    return {

    }
  },
  computed: {
    show () {
      return this.$vpd.state.type !== 'page'
    },
    zoom () {
      return this.$vpd.state.zoom
    }
  },
  mounted () {
    // Ctrl + C 复制元件
    document.addEventListener(
      'keyup',
      e => {
        e.stopPropagation()
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
          this.copyWidget()
        }
      },
      true
    )

    // Delete 删除选中元件
    document.addEventListener(
      'keyup',
      e => {
        e.stopPropagation()
        if (e.keyCode === 46) {
          this.dele()
        }
      },
      true
    )

    // Ctrl + S 保存
    document.addEventListener(
      'keyup',
      e => {
        e.stopPropagation()
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
          this.save()
        }
      },
      true
    )
  },
  created () {
  },
  methods: {
    // 保存
    save () {
      this.$vpd.dispatch('save')
    },

    // 复制元件
    copyWidget () {
      this.$vpd.commit('copy')
    },

    // 删除元件
    dele () {
      this.$vpd.commit('delete')
    }
  }
}
</script>

<style lang="scss">
  @import '../_variables.scss';
  .header {
    background-color: #24292e;
    padding: 12px 0;
  }
  .navbar {
    .svg-icon {
      svg {
        vertical-align: middle;
      }
    }
    .btn.btn-link {
      color: $gray-color;
      margin-right: 15px;
    }
    .btn.btn-link:hover {
      color: $light-color;
    }
    .logo {
      font-size: 20px;
      .svg-icon {
        width: 30px;
        text-align: center;
        background-color: $light-color;
        border-radius: 50%;
      }
    }
  }
</style>
<style>
  .navbar-section{
    flex:0 1 0;
  }
  .addWidget{
    width: 90px;
    color:#3fff;
    cursor: pointer;
    height:60px;
    line-height: 60px;
    display: inline-block;
  }
  .addWidget:hover{
    color:#3ffeee;
  }
  .navbar-widget-cont{
    width:100%;
    height:100%;
  }
  .index-show{
    position: absolute;
    width:400px;
    height:320px;
    z-index: 9999;
    top:60px;
    left:0;
    right:0;
    margin-left: auto;
    margin-right: auto;
    display: none;
  }
  .navbar-cont{
    float:left;
    width:33%;
  }
  .nav-middle:hover .index-show{
    display: block;
  }
  .header{
    padding:0;
    height:60px;
    position: fixed;
    top: 0;
    z-index: 9998;
    width: 100%;
  }
  .navbar-right{
    text-align: right;
  }
  .nav-middle{
    text-align: center;
  }
  .navbar-right,.logo{
    line-height: 60px;
  }
  .logo a{
    color:#bcc3ce;
  }
</style>
