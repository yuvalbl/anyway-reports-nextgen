import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import type { Options } from 'highcharts'

type Props = { options: Options }

export const Graph: React.FC<Props> = ({ options }) => {
  return (
    <div className="my-2">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}
