import axios from 'axios'
let Base64 = require('js-base64').Base64
export default {
  data () {
    return {
      timer: null,
      materialList: null
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
    },
    'val.csvSeries': function (newValue) {
      if (!this.checkChose()) {
        return false
      }
      this.getCsvOptionData()
    },
    'val.csvNum': function (newValue) {
      if (!this.checkChose()) {
        return false
      }
      this.getCsvOptionData()
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

      if (this.val.dataOrigin === 'csv') {
        this.getCsvOptionData()
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
    },
    checkChose () {
      if (!this.val.csvSeries) {
        return false
      }
      if (this.val.csvNum.constructor === Array && !this.val.csvNum.length) {
        return false
      } else {
        if (!this.val.csvNum) {
          return false
        }
      }
      return true
    },
    getCsvOptionData () {
      let params = {
        groups: Base64.encode(this.val.csvSeries),
        // type: this.val.type,
        // type: 'uuid1',
        source: this.val.csvHash,
        hash: this.$route.params.hash
      }
      if (this.val.csvNum.constructor === Array) {
        params.values = Base64.encode(this.val.csvNum.join('-'))
        params.type = this.val.type === 'BasicTable' ? 'uuid9' : 'uuid6'
      } else {
        params.values = Base64.encode(this.val.csvNum)
        params.type = 'uuid1'
      }
      if (!this.val.csvSeries) {
        return false
      }
      if (!this.val.csvNum) {
        return false
      }
      let url = `${process.env.BASE_API}/material/jsonapi?groups=${params.groups}&values=${params.values}&type=${params.type}&source=${params.source}&hash=${params.hash}`

      axios({
        type: 'get',
        url: url,
        data: params
      }).then(res => {
        if (res.data.code === 0) {
          this.dynamicData = res.data
        } else {
          console.log('数据请求错误')
        }
      })
    }
  }
}
