export default {
  addWidget ({ state, commit, store }, item) {
    if (item.setting.isUpload) {
      store.$emit('upload', (payload) => {
        commit('ADD_WIDGET', { data: payload, item })
      }, true)
    } else {
      commit('ADD_WIDGET', { item })
      // 设置选中
      commit('SELECT_WIDGET', {
        uuid: state.widgets[state.widgets.length - 1].uuid
      })
    }
  },
  save ({ state, store }) {
    store.$emit('save', state)
  },
  quit ({ state, store }) {
    store.$emit('quit', state)
  }
}
