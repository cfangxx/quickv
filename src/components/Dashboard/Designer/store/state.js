export default {
  top: 0, // 添加元件的初始纵坐标
  zoom: 100, // 画布缩放百分比
  type: 'page', // 选中元素类型
  index: -1, // 选中元素索引
  uuid: null, // 选中元素uuid
  counter: 0, // 容器副本命名时避免重名所用的计数器

  originX: 0, // 选中元件的横向初始值
  originY: 0, // 选中元件的纵向初始值
  startX: 0, // 鼠标摁下时的横坐标
  startY: 0, // 鼠标摁下时的纵坐标
  moving: false, // 是否正在移动元件（参考线仅在移动元件时显示）

  animation: [], // 动画库
  playState: false, // 动画播放状态

  activeElement: {}, // 选中对象，要么是元件，要么是页面
  page: {
    page: true,
    title: '数据可视化大屏', // 页面 title
    width: 1920,
    height: 1080, // 画布高度
    endTime: new Date().getTime(), // 截止日期
    backgroundColor: '#ffffff'
  },
  widgets: [] // 元件
}
