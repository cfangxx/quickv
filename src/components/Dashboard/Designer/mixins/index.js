var move = {
  methods: {
    initmovement (e) {
      var target = this.$vpd.state.activeElement

      // 设置移动状态初始值
      this.$vpd.commit('INIT_MOVE', {
        startX: e.pageX,
        startY: e.pageY,
        originX: target.left,
        originY: target.top,
        originTop: target.top,
        OriginLeft: target.left
      })

      // 绑定鼠标移动事件
      document.addEventListener('mousemove', this.handlemousemove, true)

      // 取消鼠标移动事件
      document.addEventListener('mouseup', this.handlemouseup, true)
    },

    handlemousemove (e) {
      e.stopPropagation()
      e.preventDefault()

      this.$vpd.commit('MOVE_WIDGET', {
        x: e.pageX,
        y: e.pageY
      })
    },

    handlemouseup () {
      document.removeEventListener('mousemove', this.handlemousemove, true)
      document.removeEventListener('mouseup', this.handlemouseup, true)
      this.$vpd.commit('STOP_MOVE')
    }
  }
}

export { move }
