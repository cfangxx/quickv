// charts
import BasicBarChart from './Charts/BasicBarChart'
import AreaLineChart from './Charts/AreaLineChart'
import PolarBarChart from './Charts/PolarBarChart'
import BasicPieChart from './Charts/BasicPieChart'

// effects
import RotateLine from './Effects/RotateLine'

// indicator
import CircularProgressBar from './Indicator/CircularProgressBar'

// maps
import ChinaMap from './Maps/ChinaMap'
import ChinaScatterMap from './Maps/ChinaScatterMap'

// materials
import Picture from './Materials/Picture'
import Button from './Materials/Button'
import Rect from './Materials/Rect'

// tables
import BasicTable from './Tables/BasicTable'

// texts
import BasicTxtBox from './Texts/BasicTxtBox'
import BasicRTClock from './Texts/BasicClock'

export default {
  // chatrs
  [BasicBarChart.name]: BasicBarChart,
  [AreaLineChart.name]: AreaLineChart,
  [PolarBarChart.name]: PolarBarChart,
  [BasicPieChart.name]: BasicPieChart,

  // effects
  [RotateLine.name]: RotateLine,

  // indicator
  [CircularProgressBar.name]: CircularProgressBar,

  // map
  [ChinaMap.name]: ChinaMap,
  [ChinaScatterMap.name]: ChinaScatterMap,

  // materials
  [Picture.name]: Picture,
  [Button.name]: Button,
  [Rect.name]: Rect,

  // tables
  [BasicTable.name]: BasicTable,

  // texts
  [BasicTxtBox.name]: BasicTxtBox,
  [BasicRTClock.name]: BasicRTClock
}
