// charts
import BasicBarChart from './Charts/BasicBarChart'
import AreaLineChart from './Charts/AreaLineChart'
import LinesAreaChart from './Charts/LinesAreaChart'
import PolarBarChart from './Charts/PolarBarChart'
import BasicPieChart from './Charts/BasicPieChart'
import RadarChart from './Charts/RadarChart'

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
import Iframe from './Materials/Iframe'

// tables
import BasicTable from './Tables/BasicTable'

// texts
import BasicTxtBox from './Texts/BasicTxtBox'
import BasicRTClock from './Texts/BasicClock'

export default {
  // chatrs
  [BasicBarChart.name]: BasicBarChart,
  [AreaLineChart.name]: AreaLineChart,
  [LinesAreaChart.name]: LinesAreaChart,
  [PolarBarChart.name]: PolarBarChart,
  [BasicPieChart.name]: BasicPieChart,
  [RadarChart.name]: RadarChart,

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
  [Iframe.name]: Iframe,

  // tables
  [BasicTable.name]: BasicTable,

  // texts
  [BasicTxtBox.name]: BasicTxtBox,
  [BasicRTClock.name]: BasicRTClock
}
