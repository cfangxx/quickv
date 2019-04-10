import braidButton from './button/index.vue'
import braidLinechart from './linechart/index.vue'
import braidBarpolar from './barPolar/index.vue'
import braidBg from './bg/index.vue'
import braidPic from './pic/index.vue'
import braidTxt from './txt/index.vue'
import braidContainer from './container/index.vue'
import braidTable from './table/index.vue'

export default {
  [braidButton.name]: braidButton,
  [braidLinechart.name]: braidLinechart,
  [braidBarpolar.name]: braidBarpolar,
  [braidBg.name]: braidBg,
  [braidPic.name]: braidPic,
  [braidTxt.name]: braidTxt,
  [braidContainer.name]: braidContainer,
  [braidTable.name]: braidTable
}
