export default {
  top: 400, // 添加组件的初始纵坐标
  type: 'page', // 选中组件类型
  index: -1, // 选中组件索引

  uuid: null, // 选中组件uuid
  counter: 0, // 容器副本命名时避免重名所用的计数器
  uuidList: [], // 多选组件的uuid
  multiSelect: false, // 是否多选

  originX: 0, // 选中组件的横向初始值
  originY: 0, // 选中组件的纵向初始值
  originTop: 0, // 选中
  originLeft: 0,
  startX: 0, // 鼠标摁下时的横坐标
  startY: 0, // 鼠标摁下时的纵坐标
  moving: false, // 是否正在移动组件（参考线仅在移动组件时显示）

  animation: [], // 动画库
  playState: false, // 动画播放状态

  activeElement: {}, // 选中对象，要么是组件，要么是页面
  linkage: {}, // 联动数据
  page: {
    page: true,
    title: '数据可视化大屏', // 页面 title
    about: '', // 简介
    width: 1920, // 画布宽度
    height: 1080, // 画布高度
    endTime: new Date().getTime(), // 修改日期
    backgroundColor: '#ffffff', // 背景色
    backPic: '', // 背景图片
    zoom: 100 // 画布缩放百分比
  },
  widgets: [], // 组件
  steps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}
