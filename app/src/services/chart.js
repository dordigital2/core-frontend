const ChartTypes = {
  bar: 'Bar',
  line: 'Line',
  pie: 'Pie'
}

const ChartConfig = {
  getChartTypes() {
    return ChartTypes
  },
  getComponent(type) {
    return ChartTypes[type] ? 'Chart' + ChartTypes[type] : 'ChartBar'
  }
}

export default ChartConfig
