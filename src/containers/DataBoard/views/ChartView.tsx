import * as React from 'react'
import { Line } from '@ant-design/plots'
import { IChartConfig } from './FromView'
import { Pie } from '@ant-design/plots'
import { converValuesType } from '@/utils/table'
import { Area, Column } from '@ant-design/charts'

interface IChartView {
    table?: any
    config?: IChartConfig
}

const LineChart = (props: IChartView) => {
    const { table } = props
    const { config } = props
    if (config?.x?.name === undefined || config?.y?.name === undefined)
        return <div>{'参数错误'}</div>

    const data = converValuesType(table, config.y.name, 'number')
    if (config.type === 'fold') {
        const chartConfig: any = {
            data: data,
            xField: config.x.name,
            yField: config.y.name,
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
        return <Line {...chartConfig} />
    } else if (config.type === 'bar') {
        const chartConfig: any = {
            data: data,
            xField: config.x.name,
            yField: config.y.name,
            seriesField: config?.serise?.name,
            isGroup: 'true',
            xAxis: undefined,
            columnStyle: {
                radius: [20, 20, 0, 0],
            },
        }
        // if (config?.x?.type === 'Data') {
        //     chartConfig['xAxis'] = {
        //         type: 'time'
        //     }
        // }
        console.log(chartConfig)
        return <Column {...chartConfig} />
    } else {
        const chartConfig = {
            data: data,
            xField: config.x.name,
            yField: config.y.name,
            seriesField: config?.serise?.name,
        }
        // console.log(chartConfig)

        return <Area {...chartConfig} />
    }
    return <></>
}

const PalChart = (props: IChartView) => {
    const { table } = props
    const { config } = props

    if (config?.x?.name === undefined || config?.y?.name === undefined)
        return <div>{'参数错误'}</div>

    const data = converValuesType(table, config.y.name, 'number')
    // console.log(table)
    let chartConfig: any
    if (config.type === 'pal') {
        chartConfig = {
            appendPadding: 10,
            data: data,
            angleField: config.y.name,
            colorField: config.x.name,
            radius: 0.75,
            label: {
                type: 'spider',
                labelHeight: 28,
                content: '{name}\n{percentage}'
            },
            interactions: [
                {
                    type: 'element-selected'
                },
                {
                    type: 'element-active'
                }
            ]
        }
    } else {
        chartConfig = {
            appendPadding: 10,
            data: data,
            angleField: config.y.name,
            colorField: config.x.name,
            radius: 1,
            innerRadius: 0.64,
            label: {
                type: 'inner',
                offset: '-50%',
                style: {
                    textAlign: 'center'
                },
                autoRotate: false,
                content: '{value}'
            },
            // 添加 中心统计文本 交互
            interactions: [
                {
                    type: 'element-selected'
                },
                {
                    type: 'element-active'
                },
                {
                    type: 'pie-statistic-active'
                }
            ]
        }
    }
    return <Pie {...chartConfig} />
}

const ChartView: React.FunctionComponent<IChartView> = (props) => {
    console.log(props)
    if (
        props.config === undefined ||
        props.table === undefined ||
        props.config.x === undefined ||
        props.config.y === undefined ||
        props.table.length === 0
    ) {
        return <div>{'请先选择图表信息'}</div>
    }

    const chartArr: any = {
        fold: <LineChart {...props} />,
        pal: <PalChart {...props} />,
        ring: <PalChart {...props} />,
        bar: <LineChart {...props} />,
        area: <LineChart {...props} />,
    }

    //return <PalChart {...props} />
    return <div>{chartArr[props.config.type]}</div>
}

export default ChartView
