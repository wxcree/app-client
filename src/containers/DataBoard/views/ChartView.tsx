import * as React from 'react'
import { Line } from '@ant-design/plots'
import { IChartConfig } from './FromView'

interface IChartView {
    table?: any
    config?: IChartConfig
}

const LineChart = (props: IChartView) => {

    const { table } = props
    const { config } = props

    const chartConfig: any = {
        data: table,
        xField: config?.x?.name,
        yField: config?.y?.name,
        seriesField: config?.serise?.name,
        xAxis: undefined,
        yAxis: {
            type: 'linear'
        }
    }
    if (config?.x?.type === 'Data') {
        chartConfig['xAxis'] = {
            type: 'time'
        }
    }
    console.log(chartConfig)

    return <Line {...chartConfig} />
    return <></>
}

const ChartView: React.FunctionComponent<IChartView> = (props) => {
    console.log(props)
    if (
        props.config === undefined ||
        props.table === undefined ||
        props.config === {} ||
        props.table.length === 0
    ) {
        return <div>{'请先选择图表信息'}</div>
    }
    return (
        <div>
            <LineChart {...props} />
        </div>
    )
}

export default ChartView
