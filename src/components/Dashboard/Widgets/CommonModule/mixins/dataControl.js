import axios from 'axios'

export default {
  data () {
    return {
      timer: null
    }
  },
  computed: {
    linkage () {
      return this.$vpd.state.linkage[this.val.linkMainUUID] || null
    }
  },
  beforeMount () {
    this.setOptionData()
  },
  beforeDestroy () {
    this.clearTimer()
  },
  watch: {
    'val.dataOrigin': function () {
      this.setOptionData()
    },
    'val.dataAutoRefresh': function () {
      this.setOptionData()
    },
    'val.dataRefresh': function () {
      this.setOptionData()
    },
    '$vpd.state.linkage': function () {
      if (this.val.linkEnable && !this.val.linkIsMain) {
        this.applyLinkage()
      }
    },
    'val.linkIsMain': function (n, o) {
      if (n) {
        this.$vpd.commit('UPDATE_LINKAGE', { uuid: this.val.uuid, value: this.dynamicData })
      }
    },
    'dynamicData': function (newValue, o) {
      if (this.val.linkEnable && this.val.linkIsMain) {
        this.$vpd.commit('UPDATE_LINKAGE', { uuid: this.val.uuid, value: newValue })
      }
    },
    'val.staticData': function (newValue, o) {
      if (this.val.dataOrigin === 'local') {
        this.dynamicData = newValue
      }
    }
  },
  methods: {
    setOptionData () { // API 拉取数据
      if (this.val.linkEnable && !this.val.linkIsMain) {
        this.applyLinkage()
        return
      }

      if (this.val.dataOrigin === 'local') {
        this.dynamicData = this.val.staticData
        return
      }

      if (this.val.dataOrigin === 'api') {
        axios({
          type: 'get',
          headers: { 'Content-Type': 'application/json' },
          url: this.val.dataAPI
        }).then(response => {
          if (response.data.code === 0) {
            this.dynamicData = response.data
          }
        })
      }

      this.clearTimer()
      if (this.val.dataAutoRefresh) {
        let _this = this
        this.timer = setTimeout(() => { _this.setOptionData() }, _this.val.dataRefreshTime * 1000)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    applyLinkage () {
      const linkage = this.$vpd.state.linkage
      if (this.val.linkMainUUID !== '' && linkage[this.val.linkMainUUID]) {
        this.dynamicData = linkage[this.val.linkMainUUID]
      }
    }
  }
}
