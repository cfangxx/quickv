import braidButton from './button/index.vue'
import braidLinechart from './linechart/index.vue'
import braidBarchart from './barchart/index.vue'
import braidBarpolar from './barPolar/index.vue'
import braidProgressBar from './chartProgressBar/index.vue'
import braidMap from './chartMap/index.vue'

import braidBg from './bg/index.vue'
import braidPic from './pic/index.vue'
import braidTxt from './txt/index.vue'
import braidTime from './time/index.vue'
import braidContainer from './container/index.vue'
import braidTable from './table/index.vue'

export default {
  [braidButton.name]: braidButton,
  [braidLinechart.name]: braidLinechart,
  [braidBarchart.name]: braidBarchart,
  [braidBarpolar.name]: braidBarpolar,
  [braidProgressBar.name]: braidProgressBar,
  [braidMap.name]: braidMap,
  [braidBg.name]: braidBg,
  [braidPic.name]: braidPic,
  [braidTxt.name]: braidTxt,
  [braidTime.name]: braidTime,
  [braidContainer.name]: braidContainer,
  [braidTable.name]: braidTable
}
