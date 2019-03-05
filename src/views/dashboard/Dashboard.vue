<template>
  <vue-page-preview
    :value="value"
    :upload="handleUpload"
    :upload-option="uploadOption"
    @save="handleSave" />
</template>

<script>
import Vue from 'vue'
import vuePagePreview from '@/components/Dashboard/Preview'
Vue.use(vuePagePreview)

// var dashboard = {'top': 0, 'zoom': 64, 'type': 'braid-button', 'index': -1, 'uuid': 'ad548a3423', 'counter': 0, 'originX': 0, 'originY': 0, 'startX': 0, 'startY': 0, 'moving': false, 'animation': [], 'playState': false, 'activeElement': {'type': 'braid-button', 'isContainer': false, 'isUpload': false, 'hasGuide': true, 'isChild': true, 'dragable': true, 'resizable': true, 'name': '', 'width': 250, 'height': 60, 'left': 50, 'top': 0, 'z': 0, 'bgColor': '#000000', 'backPic': '', 'backPicUrl': '', 'color': '#ffffff', 'text': '按钮', 'belong': 'page', 'animationName': '', 'uuid': 'ad548a3423'}, 'page': {'page': true, 'title': '测试页面', 'height': 1500, 'endTime': '2019-02-26T01: 31: 49.306Z', 'backgroundColor': '#fff'}, 'widgets': [{'type': 'braid-button', 'isContainer': false, 'isUpload': false, 'hasGuide': true, 'isChild': true, 'dragable': true, 'resizable': true, 'name': '', 'width': 250, 'height': 60, 'left': 50, 'top': 0, 'z': 0, 'bgColor': '#000000', 'backPic': '', 'backPicUrl': '', 'color': '#ffffff', 'text': '按钮', 'belong': 'page', 'animationName': '', 'uuid': 'ad548a3423'}]};
var dashboard = {'top': 0, 'zoom': 64, 'type': 'page', 'index': -1, 'uuid': -1, 'counter': 0, 'originX': 87, 'originY': 92, 'startX': 1005, 'startY': 202, 'moving': false, 'animation': [], 'playState': false, 'activeElement': {'page': true, 'title': '测试页面', 'width': 1920, 'height': 1080, 'endTime': '2019-02-26T08:52:00.539Z', 'backgroundColor': '#fff'}, 'page': {'page': true, 'title': '测试页面', 'width': 1920, 'height': 1080, 'endTime': '2019-02-26T08:52:00.539Z', 'backgroundColor': '#fff'}, 'widgets': [{'type': 'braid-txt', 'isContainer': false, 'isUpload': false, 'hasGuide': true, 'isChild': true, 'dragable': true, 'resizable': true, 'width': 650, 'height': 100, 'left': 87, 'top': 92, 'z': 0, 'lineHeight': 1.6, 'fontSize': 1.94, 'fontWeight': false, 'color': '#000000', 'textAlign': 'center', 'text': '海南是没什么事吗大屏', 'href': '', 'belong': 'page', 'animationName': '', 'uuid': 'a4d9747aa1'}, {'type': 'line-chart', 'isContainer': false, 'isUpload': false, 'hasGuide': true, 'isChild': true, 'dragable': true, 'resizable': true, 'name': '', 'width': 600, 'height': 578, 'left': 79, 'top': 239, 'z': 0, 'axisData': '1820, 932, 901, 934, 1290, 1330, 1320', 'backPic': '', 'backPicUrl': '', 'color': '#ffffff', 'text': '按钮', 'belong': 'page', 'animationName': '', 'uuid': 'c60f5b0639'}]}
export default {
  name: 'PreviewDashboard',
  data () {
    return {
      value: dashboard,
      uploadOption: {
        url: 'https://jsonplaceholder.typicode.com/photos'
      }
    }
  },

  created () {
    let data = window.localStorage.getItem('vpd-data')
    if (data) {
      this.value = JSON.parse(data)
    }
  },

  methods: {
    handleSave (data) {
      console.log('saving:', data)
      window.localStorage.setItem('vpd-data', JSON.stringify(data))
    },
    handleUpload (files) {
      console.log('uploading:', files)
      return new Promise(resolve => {
        resolve({
          files: files,
          status: 200
        })
      })
    }
  }
}
</script>
