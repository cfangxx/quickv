// 默认 widgets
import Widgets from '@/components/Dashboard/Widgets'
import vpd from '../mixins/vpd'

var widgets
var finalWidgets
var widgetStyle = {}

const install = (Vue, config = {}) => {
  if (install.installed) return
  widgets = Object.assign({}, Widgets, config.widgets)

  Object.keys(widgets).forEach(name => {
    if (widgets[name]['type']) { // 同一个组件显示为不同的默认样式
      let type = widgets[name]['type']
      var copywidgets = {}
      for (let i in type) {
        var copyWidget = Object.assign({}, widgets[name])
        var settingStr = JSON.stringify(copyWidget.setting)
        var setting = JSON.parse(settingStr)
        delete copyWidget.type
        copyWidget.name = type[i].flag
        copyWidget.icon = type[i].icon
        copyWidget.title = type[i].title
        setting.type = type[i].flag
        setting.name = type[i].title
        setting.desc = type[i].desc
        copyWidget.setting = setting
        copywidgets[type[i].flag] = copyWidget
      }
      finalWidgets = Object.assign(widgets, copywidgets)
    }
  })
  // console.log(finalWidgets)
  Object.keys(finalWidgets).forEach(key => {
    Vue.component(key, Vue.extend(finalWidgets[key]).extend(vpd))
    // style panel
    if (finalWidgets[key]['panel']) {
      let panel = Object.assign({}, finalWidgets[key]['panel'])
      if (finalWidgets[key]['type']) {
        let type = finalWidgets[key]['type']
        for (let i in type) {
          var panelCopy = Object.assign({}, finalWidgets[key]['panel'], {
            name: type[i].styleName,
            type: type[i].flag
          })
          panel = Object.assign(panel, panelCopy)
        }
      } else {
        panel = Object.assign(panel, {
          type: finalWidgets[key]['setting']['type']
        })
      }
      Vue.component(panel.name, Vue.extend(panel).extend(vpd))
      widgetStyle[panel.name] = panel
      // remove panel from object
      delete finalWidgets[key]['panel']
    }
  })
  // console.log(widgetStyle)
}

export default {
  install,
  getWidgets () {
    return finalWidgets
  },
  getWidgetStyle () {
    return widgetStyle
  }
}
